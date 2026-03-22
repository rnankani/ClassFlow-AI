import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const GOOGLE_CLASSROOM_BASE = "https://classroom.googleapis.com/v1"

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

    // Verify user JWT
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser()
    if (userError || !user) {
      return new Response("Unauthorized", { status: 401, headers: corsHeaders })
    }

    // Get Google tokens
    const { data: tokens } = await supabaseAdmin
      .from("google_tokens")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (!tokens) {
      return new Response(
        JSON.stringify({ error: "No Google tokens found. Please re-authenticate." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    let accessToken = tokens.access_token

    // Refresh if expired
    if (tokens.token_expires_at && new Date(tokens.token_expires_at) < new Date()) {
      if (!tokens.refresh_token) {
        return new Response(
          JSON.stringify({ error: "Token expired and no refresh token. Please re-authenticate." }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
      }
      accessToken = await refreshGoogleToken(supabaseAdmin, user.id, tokens.refresh_token)
    }

    // Fetch courses
    const coursesRes = await fetch(
      `${GOOGLE_CLASSROOM_BASE}/courses?studentId=me&courseStates=ACTIVE`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    if (!coursesRes.ok) {
      const errText = await coursesRes.text()
      return new Response(
        JSON.stringify({ error: `Google API error: ${errText}` }),
        { status: coursesRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    const coursesData = await coursesRes.json()

    if (!coursesData.courses || coursesData.courses.length === 0) {
      return new Response(
        JSON.stringify({ courses: 0, assignments: 0, synced_at: new Date().toISOString() }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    let totalAssignments = 0

    for (const course of coursesData.courses) {
      // Upsert course
      await supabaseAdmin.from("courses").upsert(
        {
          user_id: user.id,
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

      // Get internal course ID
      const { data: dbCourse } = await supabaseAdmin
        .from("courses")
        .select("id")
        .eq("user_id", user.id)
        .eq("google_course_id", course.id)
        .single()

      if (!dbCourse) continue

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
          dueDate = new Date(
            year,
            month - 1,
            day,
            time.hours || 0,
            time.minutes || 0
          ).toISOString()
        }

        // Fetch student submission state
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
          // Continue with default state
        }

        await supabaseAdmin.from("assignments").upsert(
          {
            user_id: user.id,
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
        totalAssignments++
      }
    }

    return new Response(
      JSON.stringify({
        courses: coursesData.courses.length,
        assignments: totalAssignments,
        synced_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})

async function refreshGoogleToken(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string,
  refreshToken: string
): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: Deno.env.get("GOOGLE_CLIENT_ID")!,
      client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET")!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  })

  const data = await res.json()

  if (!data.access_token) {
    throw new Error("Failed to refresh Google token")
  }

  await supabaseAdmin
    .from("google_tokens")
    .update({
      access_token: data.access_token,
      token_expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)

  return data.access_token
}
