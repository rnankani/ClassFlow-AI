import { createClient } from "@/lib/supabase/server"
import { AssignmentList } from "@/components/dashboard/AssignmentList"

export default async function AssignmentsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: assignments } = await supabase
    .from("assignments")
    .select("*, courses(name)")
    .eq("user_id", user!.id)
    .order("due_date", { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900">Assignments</h1>
        <p className="text-sm text-dark-400 mt-1">
          All your assignments across courses
        </p>
      </div>
      <AssignmentList assignments={assignments || []} title="All Assignments" />
    </div>
  )
}
