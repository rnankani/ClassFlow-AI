import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return new Response("Unauthorized", { status: 401, headers: corsHeaders })
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const {
      data: { user },
    } = await supabaseUser.auth.getUser()
    if (!user) {
      return new Response("Unauthorized", { status: 401, headers: corsHeaders })
    }

    const { type = "daily_briefing" } = await req.json()

    // Fetch pending assignments with course names
    const { data: assignments } = await supabaseAdmin
      .from("assignments")
      .select("*, courses(name)")
      .eq("user_id", user.id)
      .in("submission_state", ["NEW", "CREATED", "RECLAIMED_BY_STUDENT"])
      .order("due_date", { ascending: true })

    if (!assignments || assignments.length === 0) {
      const emptyResult = {
        summary: "You're all caught up! No pending assignments right now.",
        action_items: ["Take a well-deserved break", "Review your notes for upcoming topics"],
        tips: ["Use this free time to get ahead on reading"],
      }
      return new Response(JSON.stringify(emptyResult), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const assignmentContext = assignments.map((a) => ({
      title: a.title,
      course: a.courses?.name,
      due_date: a.due_date,
      description: a.description?.slice(0, 200),
      urgency: a.urgency_level,
      type: a.work_type,
    }))

    const systemPrompts: Record<string, string> = {
      daily_briefing: `You are a helpful, encouraging student assistant. Generate a daily briefing based on the student's assignments. Prioritize by urgency. Be concise and actionable. Return valid JSON with this exact structure: { "summary": "A 2-3 sentence overview of what needs attention today", "action_items": ["specific actionable task 1", "specific actionable task 2", ...], "tips": ["helpful study tip 1", "helpful study tip 2"] }`,
      weekly_overview: `You are a helpful student assistant. Generate a weekly overview of the student's workload. Group by course, highlight deadlines. Return valid JSON: { "summary": "Weekly workload overview", "action_items": ["task 1", "task 2", ...], "tips": ["tip 1", "tip 2"] }`,
      assignment_breakdown: `You are a helpful student assistant. Break down the most urgent assignments into manageable steps. Return valid JSON: { "summary": "Focus areas", "action_items": ["step 1", "step 2", ...], "tips": ["tip 1", "tip 2"] }`,
    }

    const aiRes = await fetch("https://api.featherless.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("FEATHERLESS_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "moonshotai/Kimi-K2.5",
        messages: [
          { role: "system", content: systemPrompts[type] || systemPrompts.daily_briefing },
          { role: "user", content: JSON.stringify(assignmentContext) },
        ],
        temperature: 0.7,
      }),
    })

    if (!aiRes.ok) {
      const errText = await aiRes.text()
      return new Response(
        JSON.stringify({ error: `Featherless AI error: ${errText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const aiData = await aiRes.json()
    let content
    try {
      content = JSON.parse(aiData.choices[0].message.content)
    } catch {
      // If the model doesn't return clean JSON, extract it
      const raw = aiData.choices[0].message.content
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        content = JSON.parse(jsonMatch[0])
      } else {
        content = {
          summary: raw,
          action_items: [],
          tips: [],
        }
      }
    }

    // Store summary
    await supabaseAdmin.from("ai_summaries").insert({
      user_id: user.id,
      summary_type: type,
      content,
    })

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
