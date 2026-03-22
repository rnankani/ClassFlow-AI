import { createClient } from "@/lib/supabase/server"
import { CourseList } from "@/components/dashboard/CourseList"

export default async function CoursesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("user_id", user!.id)
    .order("name")

  const { data: assignments } = await supabase
    .from("assignments")
    .select("*, courses(name)")
    .eq("user_id", user!.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900">Courses</h1>
        <p className="text-sm text-dark-400 mt-1">
          All your synced Google Classroom courses
        </p>
      </div>
      <CourseList courses={courses || []} assignments={assignments || []} />
    </div>
  )
}
