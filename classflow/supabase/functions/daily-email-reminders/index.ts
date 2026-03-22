import { createAdminClient, getValidAccessToken, hasScope, GMAIL_BASE, corsHeaders } from "../_shared/google-auth.ts"

function buildMimeMessage(to: string, subject: string, htmlBody: string): string {
  const raw = btoa(
    `To: ${to}\r\nSubject: ${subject}\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset="UTF-8"\r\n\r\n${htmlBody}`
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
  return raw
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  })
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabase = createAdminClient()

  try {
    let userId: string | null = null
    let assignmentTitle: string | null = null

    try {
      const body = await req.json()
      if (body.record) {
        userId = body.record.user_id
        assignmentTitle = body.record.title
      } else {
        userId = body.user_id || null
      }
    } catch {
      // No body
    }

    if (!userId) {
      return new Response(JSON.stringify({ message: "user_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Check if user has reminders enabled
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("email, full_name, email_reminders_enabled")
      .eq("id", userId)
      .single()

    if (!profile?.email_reminders_enabled || !profile.email) {
      return new Response(JSON.stringify({ message: "Reminders not enabled" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Check gmail scope
    const { data: tokens } = await supabase
      .from("google_tokens")
      .select("scopes")
      .eq("user_id", userId)
      .single()

    if (!tokens || !hasScope(tokens.scopes, "gmail.send")) {
      return new Response(JSON.stringify({ message: "Missing gmail scope" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Get due-soon assignments for context
    const threeDays = new Date(Date.now() + 3 * 86400000).toISOString()
    const { data: assignments } = await supabase
      .from("assignments")
      .select("title, due_date, urgency_level, alternate_link, courses(name)")
      .eq("user_id", userId)
      .in("submission_state", ["NEW", "CREATED", "RECLAIMED_BY_STUDENT"])
      .lte("due_date", threeDays)
      .order("due_date", { ascending: true })

    if (!assignments || assignments.length === 0) {
      return new Response(JSON.stringify({ message: "No due assignments" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const firstName = profile.full_name?.split(" ")[0] || "there"
    const rows = assignments
      .map(
        (a) =>
          `<tr><td style="padding:8px;border-bottom:1px solid #eee"><a href="${a.alternate_link}" style="color:#4F46E5">${a.title}</a></td><td style="padding:8px;border-bottom:1px solid #eee;color:#666">${a.courses?.name || ""}</td><td style="padding:8px;border-bottom:1px solid #eee;color:#666">${a.due_date ? formatDate(a.due_date) : ""}</td></tr>`
      )
      .join("")

    const subject = assignmentTitle
      ? `New assignment: ${assignmentTitle}`
      : `ClassFlow: ${assignments.length} assignment${assignments.length > 1 ? "s" : ""} due soon`

    const html = `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1a1a2e">Hey ${firstName}!</h2>
      <p style="color:#666">${assignmentTitle ? `"${assignmentTitle}" was just assigned.` : ""} You have <strong>${assignments.length}</strong> assignment${assignments.length > 1 ? "s" : ""} coming up:</p>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <p style="margin-top:24px;color:#999;font-size:12px">Sent by ClassFlow</p>
    </div>`

    const accessToken = await getValidAccessToken(supabase, userId)
    const gmailRes = await fetch(`${GMAIL_BASE}/users/me/messages/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw: buildMimeMessage(profile.email, subject, html) }),
    })

    if (!gmailRes.ok) {
      const errText = await gmailRes.text()
      await supabase.from("email_logs").insert({ user_id: userId, email_type: "assignment_notification", status: "failed", error_message: errText })
      throw new Error(`Gmail error: ${errText}`)
    }

    await supabase.from("email_logs").insert({ user_id: userId, email_type: "assignment_notification", status: "sent" })

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
