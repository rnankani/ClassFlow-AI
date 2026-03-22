import { createAdminClient, getValidAccessToken, hasScope, GOOGLE_CALENDAR_BASE, corsHeaders } from "../_shared/google-auth.ts"

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabase = createAdminClient()

  try {
    let userId: string | null = null
    let assignmentId: string | null = null

    try {
      const body = await req.json()
      if (body.record) {
        // Database webhook format
        userId = body.record.user_id
        assignmentId = body.record.id
      } else {
        userId = body.user_id || null
        assignmentId = body.assignment_id || null
      }
    } catch {
      // No body
    }

    // If no user specified, skip (requires a user context for Google tokens)
    if (!userId) {
      return new Response(JSON.stringify({ message: "user_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Check if user has calendar sync enabled
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("calendar_sync_enabled")
      .eq("id", userId)
      .single()

    if (!profile?.calendar_sync_enabled) {
      return new Response(JSON.stringify({ message: "Calendar sync not enabled" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Check calendar scope
    const { data: tokens } = await supabase
      .from("google_tokens")
      .select("scopes")
      .eq("user_id", userId)
      .single()

    if (!tokens || !hasScope(tokens.scopes, "calendar.events")) {
      return new Response(JSON.stringify({ message: "Missing calendar scope" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Get assignments to sync
    let query = supabase
      .from("assignments")
      .select("id, title, description, due_date, alternate_link, calendar_event_id, courses(name)")
      .eq("user_id", userId)
      .in("submission_state", ["NEW", "CREATED", "RECLAIMED_BY_STUDENT"])
      .not("due_date", "is", null)
      .gte("due_date", new Date().toISOString())

    if (assignmentId) {
      query = query.eq("id", assignmentId)
    }

    const { data: assignments } = await query
    if (!assignments || assignments.length === 0) {
      return new Response(JSON.stringify({ message: "No assignments to sync" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const accessToken = await getValidAccessToken(supabase, userId)
    let created = 0
    let updated = 0

    for (const a of assignments) {
      const eventBody = {
        summary: `[${a.courses?.name || "Class"}] ${a.title}`,
        description: [a.description?.slice(0, 500), a.alternate_link ? `\nOpen: ${a.alternate_link}` : ""].filter(Boolean).join("\n"),
        start: { dateTime: a.due_date, timeZone: "UTC" },
        end: { dateTime: new Date(new Date(a.due_date!).getTime() + 3600000).toISOString(), timeZone: "UTC" },
        reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 60 }, { method: "popup", minutes: 1440 }] },
      }

      try {
        if (a.calendar_event_id) {
          const res = await fetch(`${GOOGLE_CALENDAR_BASE}/calendars/primary/events/${a.calendar_event_id}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify(eventBody),
          })
          if (res.ok) {
            await supabase.from("assignments").update({ calendar_synced_at: new Date().toISOString() }).eq("id", a.id)
            updated++
          }
        } else {
          const res = await fetch(`${GOOGLE_CALENDAR_BASE}/calendars/primary/events`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify(eventBody),
          })
          if (res.ok) {
            const event = await res.json()
            await supabase.from("assignments").update({ calendar_event_id: event.id, calendar_synced_at: new Date().toISOString() }).eq("id", a.id)
            created++
          }
        }
      } catch (err) {
        console.error(`Calendar error for ${a.id}:`, err)
      }
    }

    return new Response(JSON.stringify({ created, updated }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
