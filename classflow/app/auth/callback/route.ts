import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.session) {
      // Store Google OAuth tokens using admin client (google_tokens has no public RLS policies)
      const { session } = data
      if (session.provider_token) {
        const supabaseAdmin = createSupabaseClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )
        await supabaseAdmin.from("google_tokens").upsert(
          {
            user_id: session.user.id,
            access_token: session.provider_token,
            refresh_token: session.provider_refresh_token || null,
            token_expires_at: new Date(
              Date.now() + 3600 * 1000
            ).toISOString(),
            scopes: [
              "classroom.courses.readonly",
              "classroom.coursework.me",
              "classroom.rosters.readonly",
              "calendar.events",
              "gmail.send",
            ],
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        )
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/?error=auth`)
}
