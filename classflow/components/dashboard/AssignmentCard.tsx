"use client"

import {
  Clock,
  ExternalLink,
  AlertTriangle,
  AlertCircle,
  Timer,
  CheckCircle,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Assignment } from "@/lib/types"

interface AssignmentCardProps {
  assignment: Assignment
}

const urgencyConfig = {
  overdue: {
    label: "Overdue",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: AlertTriangle,
    dot: "bg-red-500",
  },
  urgent: {
    label: "Due Today",
    color: "bg-red-50 text-red-600 border-red-100",
    icon: AlertCircle,
    dot: "bg-red-400",
  },
  due_soon: {
    label: "Due Soon",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Timer,
    dot: "bg-amber-400",
  },
  on_track: {
    label: "On Track",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle,
    dot: "bg-green-400",
  },
  no_date: {
    label: "No Due Date",
    color: "bg-gray-50 text-dark-500 border-gray-200",
    icon: Calendar,
    dot: "bg-gray-400",
  },
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const urgency = urgencyConfig[assignment.urgency_level] || urgencyConfig.no_date
  const UrgencyIcon = urgency.icon

  const formatDueDate = (dateStr?: string) => {
    if (!dateStr) return "No due date"
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""} overdue`
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "Due tomorrow"
    if (diffDays <= 7) return `Due in ${diffDays} days`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", urgency.dot)} />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-dark-900 truncate">
              {assignment.title}
            </h4>
            {assignment.courses?.name && (
              <p className="text-xs text-dark-400 mt-0.5">{assignment.courses.name}</p>
            )}
            {assignment.description && (
              <p className="text-xs text-dark-400 mt-1 line-clamp-2">
                {assignment.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full border",
                  urgency.color
                )}
              >
                <UrgencyIcon className="w-3 h-3" />
                {urgency.label}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-dark-400">
                <Clock className="w-3 h-3" />
                {formatDueDate(assignment.due_date)}
              </span>
              {assignment.max_points && (
                <span className="text-[11px] text-dark-400">
                  {assignment.max_points} pts
                </span>
              )}
            </div>
          </div>
        </div>
        {assignment.alternate_link && (
          <a
            href={assignment.alternate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-dark-300 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}
