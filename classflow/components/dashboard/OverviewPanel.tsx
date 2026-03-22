"use client"

import { useRouter } from "next/navigation"
import { BookOpen, ClipboardList, AlertTriangle, CheckCircle } from "lucide-react"
import { SyncButton } from "./SyncButton"
import { AISummaryCard } from "./AISummaryCard"
import { AssignmentList } from "./AssignmentList"
import { CourseList } from "./CourseList"
import type { UserProfile, Course, Assignment } from "@/lib/types"

interface OverviewPanelProps {
  profile: UserProfile | null
  courses: Course[]
  assignments: Assignment[]
}

export function OverviewPanel({ profile, courses, assignments }: OverviewPanelProps) {
  const router = useRouter()
  const firstName = profile?.full_name?.split(" ")[0] || "there"

  const pendingAssignments = assignments.filter(
    (a) =>
      a.submission_state === "NEW" ||
      a.submission_state === "CREATED" ||
      a.submission_state === "RECLAIMED_BY_STUDENT"
  )
  const urgentAssignments = pendingAssignments.filter(
    (a) => a.urgency_level === "overdue" || a.urgency_level === "urgent"
  )
  const upcomingAssignments = pendingAssignments.filter(
    (a) => a.urgency_level === "due_soon" || a.urgency_level === "on_track"
  )

  const stats = [
    {
      label: "Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Pending",
      value: pendingAssignments.length,
      icon: ClipboardList,
      color: "text-primary-600 bg-primary-50",
    },
    {
      label: "Urgent",
      value: urgentAssignments.length,
      icon: AlertTriangle,
      color: "text-red-600 bg-red-50",
    },
    {
      label: "On Track",
      value: upcomingAssignments.length,
      icon: CheckCircle,
      color: "text-green-600 bg-green-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">
            Hey {firstName}
          </h1>
          <p className="text-sm text-dark-400 mt-1">
            Here&apos;s your academic overview for today
          </p>
        </div>
        <SyncButton onSyncComplete={() => router.refresh()} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                  <p className="text-xs text-dark-400">{stat.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Summary */}
      <AISummaryCard />

      {/* Urgent Assignments */}
      {urgentAssignments.length > 0 && (
        <AssignmentList
          assignments={urgentAssignments}
          title="Needs Attention"
          showFilter={false}
        />
      )}

      {/* Courses */}
      <CourseList courses={courses} assignments={assignments} />

      {/* All Assignments */}
      <AssignmentList
        assignments={pendingAssignments}
        title="All Pending Assignments"
      />
    </div>
  )
}
