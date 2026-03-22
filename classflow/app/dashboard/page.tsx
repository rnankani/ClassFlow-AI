import { createClient } from "@/lib/supabase/server"
import { OverviewPanel } from "@/components/dashboard/OverviewPanel"

export default async function Dashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single()

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("user_id", user!.id)
    .order("name")

  const { data: assignments } = await supabase
    .from("assignments")
    .select("*, courses(name)")
    .eq("user_id", user!.id)
    .order("due_date", { ascending: true })

  return (
    <OverviewPanel
      profile={profile}
      courses={courses || []}
      assignments={assignments || []}
    />
  )
}
