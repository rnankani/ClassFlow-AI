import { createAdminClient, getValidAccessToken, GOOGLE_CLASSROOM_BASE, corsHeaders } from "../_shared/google-auth.ts"

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabase = createAdminClient()
  const logDetails: Record<string, unknown> = { users_processed: 0, total_courses: 0, total_assignments: 0, errors: 0, user_errors: [] }

  try {
    // Get all users with Google tokens
    const { data: tokenRows } = await supabase
      .from("google_tokens")
      .select("user_id")

    if (!tokenRows || tokenRows.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users to sync", ...logDetails }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    for (const row of tokenRows) {
      const userId = row.user_id
      logDetails.users_processed = (logDetails.users_processed as number) + 1

      try {
        const accessToken = await getValidAccessToken(supabase, userId)

        // Fetch courses
        const coursesRes = await fetch(
          `${GOOGLE_CLASSROOM_BASE}/courses?studentId=me&courseStates=ACTIVE`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )

        if (!coursesRes.ok) {
          throw new Error(`Google Courses API: ${coursesRes.status}`)
        }

        const coursesData = await coursesRes.json()
        if (!coursesData.courses || coursesData.courses.length === 0) continue

        for (const course of coursesData.courses) {
          await supabase.from("courses").upsert(
            {
              user_id: userId,
              google_course_id: course.id,
              name: course.name,
              section: course.section || null,
              description: course.descriptionHeading || null,
              course_state: course.courseState,
              alternate_link: course.alternateLink,
              synced_at: new Date().toISOString(),
            },
            { onConflict: "user_id,google_course_id" }
          )

          const { data: dbCourse } = await supabase
            .from("courses")
            .select("id")
            .eq("user_id", userId)
            .eq("google_course_id", course.id)
            .single()

          if (!dbCourse) continue

          logDetails.total_courses = (logDetails.total_courses as number) + 1

          // Fetch coursework
          const workRes = await fetch(
            `${GOOGLE_CLASSROOM_BASE}/courses/${course.id}/courseWork?orderBy=dueDate%20asc`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
          if (!workRes.ok) continue

          const workData = await workRes.json()
          if (!workData.courseWork) continue

          for (const work of workData.courseWork) {
            let dueDate = null
            if (work.dueDate) {
              const { year, month, day } = work.dueDate
              const time = work.dueTime || { hours: 23, minutes: 59 }
              dueDate = new Date(year, month - 1, day, time.hours || 0, time.minutes || 0).toISOString()
            }

            // Fetch submission state
            let submissionState = "NEW"
            try {
              const subRes = await fetch(
                `${GOOGLE_CLASSROOM_BASE}/courses/${course.id}/courseWork/${work.id}/studentSubmissions?userId=me`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
              )
              if (subRes.ok) {
                const subData = await subRes.json()
                submissionState = subData.studentSubmissions?.[0]?.state || "NEW"
              }
            } catch {
              // Continue with default
            }

            await supabase.from("assignments").upsert(
              {
                user_id: userId,
                course_id: dbCourse.id,
                google_coursework_id: work.id,
                title: work.title,
                description: work.description || null,
                due_date: dueDate,
                max_points: work.maxPoints || null,
                state: work.state,
                submission_state: submissionState,
                alternate_link: work.alternateLink,
                work_type: work.workType,
                synced_at: new Date().toISOString(),
              },
              { onConflict: "user_id,google_coursework_id" }
            )

            logDetails.total_assignments = (logDetails.total_assignments as number) + 1
          }
        }
      } catch (err) {
        logDetails.errors = (logDetails.errors as number) + 1
        ;(logDetails.user_errors as string[]).push(`${userId}: ${String(err)}`)
      }

      // Small delay between users to avoid rate limits
      await new Promise((r) => setTimeout(r, 500))
    }

    await supabase.from("automation_logs").insert({
      workflow_name: "batch_sync",
      status: (logDetails.errors as number) === 0 ? "completed" : "partial",
      details: logDetails,
      completed_at: new Date().toISOString(),
    })

    return new Response(JSON.stringify(logDetails), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    await supabase.from("automation_logs").insert({
      workflow_name: "batch_sync",
      status: "failed",
      details: { ...logDetails, error: String(err) },
      completed_at: new Date().toISOString(),
    })

    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
