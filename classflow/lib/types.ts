export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  user_id: string
  google_course_id: string
  name: string
  section?: string
  description?: string
  course_state: string
  teacher_name?: string
  alternate_link?: string
  synced_at: string
  created_at: string
}

export interface Assignment {
  id: string
  user_id: string
  course_id: string
  google_coursework_id: string
  title: string
  description?: string
  due_date?: string
  max_points?: number
  state: string
  submission_state: string
  urgency_level: "overdue" | "urgent" | "due_soon" | "on_track" | "no_date"
  alternate_link?: string
  work_type: string
  synced_at: string
  created_at: string
  courses?: { name: string }
}

export interface AISummary {
  summary: string
  action_items: string[]
  tips: string[]
}
