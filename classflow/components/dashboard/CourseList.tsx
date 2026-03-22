"use client"

import { BookOpen, ExternalLink, Users } from "lucide-react"
import type { Course, Assignment } from "@/lib/types"

interface CourseListProps {
  courses: Course[]
  assignments: Assignment[]
}

const courseColors = [
  "from-primary-50 to-orange-50 border-primary-100",
  "from-blue-50 to-indigo-50 border-blue-100",
  "from-emerald-50 to-teal-50 border-emerald-100",
  "from-violet-50 to-purple-50 border-violet-100",
  "from-rose-50 to-pink-50 border-rose-100",
  "from-amber-50 to-yellow-50 border-amber-100",
]

export function CourseList({ courses, assignments }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
        <BookOpen className="w-8 h-8 text-dark-300 mx-auto mb-2" />
        <p className="text-sm text-dark-400">
          No courses synced yet. Click &ldquo;Sync Classroom&rdquo; to import your courses.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-dark-400" />
        <h3 className="font-semibold text-dark-900">Your Courses</h3>
        <span className="text-xs text-dark-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {courses.length}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.map((course, index) => {
          const courseAssignments = assignments.filter(
            (a) => a.course_id === course.id
          )
          const pending = courseAssignments.filter(
            (a) =>
              a.submission_state === "NEW" ||
              a.submission_state === "CREATED" ||
              a.submission_state === "RECLAIMED_BY_STUDENT"
          )
          const colorClass = courseColors[index % courseColors.length]

          return (
            <div
              key={course.id}
              className={`bg-gradient-to-br ${colorClass} rounded-xl border p-4 hover:shadow-md transition-all duration-200 group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-dark-900 truncate">
                    {course.name}
                  </h4>
                  {course.section && (
                    <p className="text-xs text-dark-400 mt-0.5">{course.section}</p>
                  )}
                </div>
                {course.alternate_link && (
                  <a
                    href={course.alternate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-dark-300 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-xs text-dark-500">
                  <Users className="w-3 h-3" />
                  {courseAssignments.length} assignments
                </span>
                {pending.length > 0 && (
                  <span className="text-xs text-primary-600 font-medium">
                    {pending.length} pending
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
