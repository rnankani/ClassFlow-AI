import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

export const GOOGLE_CLASSROOM_BASE = "https://classroom.googleapis.com/v1"
export const GOOGLE_CALENDAR_BASE = "https://www.googleapis.com/calendar/v3"
export const GMAIL_BASE = "https://gmail.googleapis.com/gmail/v1"

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

export function createAdminClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )
}

export async function refreshGoogleToken(
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

export async function getValidAccessToken(
  supabaseAdmin: ReturnType<typeof createClient>,
  userId: string
): Promise<string> {
  const { data: tokens } = await supabaseAdmin
    .from("google_tokens")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (!tokens) throw new Error("No Google tokens found")

  if (tokens.token_expires_at && new Date(tokens.token_expires_at) < new Date()) {
    if (!tokens.refresh_token) throw new Error("Token expired, no refresh token")
    return await refreshGoogleToken(supabaseAdmin, userId, tokens.refresh_token)
  }

  return tokens.access_token
}

export function hasScope(scopes: string[] | null, required: string): boolean {
  if (!scopes) return false
  return scopes.some((s) => s.includes(required))
}
