import { createAdminClient, corsHeaders } from "../_shared/google-auth.ts"

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabase = createAdminClient()

  try {
    let assignmentIds: string[] = []

    // Accept single assignment from trigger or batch mode
    try {
      const body = await req.json()
      if (body.record?.id) {
        // Database webhook format
        assignmentIds = [body.record.id]
      } else if (body.assignment_id) {
        assignmentIds = [body.assignment_id]
      }
    } catch {
      // No body = batch mode
    }

    // Build query
    let query = supabase
      .from("assignments")
      .select("id, title, description, work_type, courses(name)")
      .eq("is_enriched", false)
      .not("description", "is", null)

    if (assignmentIds.length > 0) {
      query = query.in("id", assignmentIds)
    } else {
      query = query.limit(20)
    }

    const { data: assignments, error } = await query
    if (error) throw error
    if (!assignments || assignments.length === 0) {
      return new Response(JSON.stringify({ message: "Nothing to enrich" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    let enriched = 0
    let failed = 0

    for (const assignment of assignments) {
      if (!assignment.description || assignment.description.length < 30) continue

      try {
        const aiRes = await fetch("https://api.featherless.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Deno.env.get("FEATHERLESS_API_KEY")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "moonshotai/Kimi-K2.5",
            messages: [
              {
                role: "system",
                content: `You are a student assistant. Analyze this assignment and return valid JSON:
{"key_topics":["topic1","topic2"],"estimated_hours":2,"difficulty":"easy|medium|hard","study_tips":["tip1","tip2"],"breakdown_steps":["step1","step2"]}`,
              },
              {
                role: "user",
                content: `Course: ${assignment.courses?.name || "Unknown"}\nTitle: ${assignment.title}\nType: ${assignment.work_type || "ASSIGNMENT"}\nDescription: ${assignment.description}`,
              },
            ],
            temperature: 0.5,
          }),
        })

        if (!aiRes.ok) throw new Error(`AI API error: ${aiRes.status}`)

        const aiData = await aiRes.json()
        const raw = aiData.choices[0].message.content
        let enrichment
        try {
          enrichment = JSON.parse(raw)
        } catch {
          const jsonMatch = raw.match(/\{[\s\S]*\}/)
          if (jsonMatch) enrichment = JSON.parse(jsonMatch[0])
          else throw new Error("Could not parse AI response")
        }

        await supabase
          .from("assignments")
          .update({ is_enriched: true, ai_enrichment: enrichment, enrichment_error: null })
          .eq("id", assignment.id)

        enriched++
      } catch (err) {
        await supabase
          .from("assignments")
          .update({ enrichment_error: String(err) })
          .eq("id", assignment.id)
        failed++
      }
    }

    return new Response(JSON.stringify({ enriched, failed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
