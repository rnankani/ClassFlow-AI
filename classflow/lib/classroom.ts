import { createClient } from "@/lib/supabase/client"
import type { AISummary } from "@/lib/types"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function invokeFunction(name: string, body?: object) {
  const supabase = createClient()
  const { data: { session }, error: refreshError } = await supabase.auth.refreshSession()
  if (refreshError || !session) throw new Error("Not authenticated — please sign out and sign back in")

  const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    let message: string
    try {
      const json = JSON.parse(text)
      message = json.error || json.message || text
    } catch {
      message = text || `Error ${res.status}`
    }
    throw new Error(message)
  }

  return res.json()
}

export async function syncClassroom(): Promise<{ courses: number; synced_at: string }> {
  return invokeFunction("sync-classroom")
}

export async function generateSummary(
  type: "daily_briefing" | "weekly_overview" | "assignment_breakdown" = "daily_briefing"
): Promise<AISummary> {
  return invokeFunction("generate-summary", { type })
}
