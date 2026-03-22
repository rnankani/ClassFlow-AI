"use client"

import { useState } from "react"
import { ClipboardList, Filter } from "lucide-react"
import { AssignmentCard } from "./AssignmentCard"
import { cn } from "@/lib/utils"
import type { Assignment } from "@/lib/types"

interface AssignmentListProps {
  assignments: Assignment[]
  title?: string
  showFilter?: boolean
}

type FilterType = "all" | "overdue" | "urgent" | "due_soon" | "on_track"

export function AssignmentList({
  assignments,
  title = "Assignments",
  showFilter = true,
}: AssignmentListProps) {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered =
    filter === "all"
      ? assignments
      : assignments.filter((a) => a.urgency_level === filter)

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "overdue", label: "Overdue" },
    { key: "urgent", label: "Urgent" },
    { key: "due_soon", label: "Due Soon" },
    { key: "on_track", label: "On Track" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-dark-400" />
          <h3 className="font-semibold text-dark-900">{title}</h3>
          <span className="text-xs text-dark-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {filtered.length}
          </span>
        </div>
        {showFilter && (
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-dark-400 mr-1" />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                  filter === f.key
                    ? "bg-primary-100 text-primary-700"
                    : "text-dark-400 hover:text-dark-600 hover:bg-gray-50"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <ClipboardList className="w-8 h-8 text-dark-300 mx-auto mb-2" />
          <p className="text-sm text-dark-400">
            {filter === "all"
              ? "No assignments yet. Sync your Google Classroom to get started."
              : `No ${filter.replace("_", " ")} assignments.`}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      )}
    </div>
  )
}
