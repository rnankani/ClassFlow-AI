"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { AISummaryCard } from "@/components/dashboard/AISummaryCard"
import { generateSummary } from "@/lib/classroom"
import type { AISummary } from "@/lib/types"
import { cn } from "@/lib/utils"

type SummaryType = "daily_briefing" | "weekly_overview" | "assignment_breakdown"

const summaryTypes: { key: SummaryType; label: string; description: string }[] = [
  {
    key: "daily_briefing",
    label: "Daily Briefing",
    description: "What needs your attention today",
  },
  {
    key: "weekly_overview",
    label: "Weekly Overview",
    description: "Your workload for the week ahead",
  },
  {
    key: "assignment_breakdown",
    label: "Assignment Breakdown",
    description: "Step-by-step plans for urgent work",
  },
]

export default function AIInsightsPage() {
  const [activeType, setActiveType] = useState<SummaryType>("daily_briefing")
  const [summaries, setSummaries] = useState<Record<string, AISummary>>({})
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (type: SummaryType) => {
    setLoading(true)
    try {
      const result = await generateSummary(type)
      setSummaries((prev) => ({ ...prev, [type]: result }))
    } catch {
      // handled in UI
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark-900">AI Insights</h1>
        <p className="text-sm text-dark-400 mt-1">
          AI-powered analysis of your academic workload
        </p>
      </div>

      {/* Type selector */}
      <div className="flex gap-2 flex-wrap">
        {summaryTypes.map((type) => (
          <button
            key={type.key}
            onClick={() => setActiveType(type.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
              activeType === type.key
                ? "bg-primary-50 text-primary-700 border-primary-200"
                : "bg-white text-dark-500 border-gray-200 hover:border-gray-300"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Active summary */}
      <div className="space-y-4">
        <AISummaryCard />

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {summaryTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => handleGenerate(type.key)}
              disabled={loading}
              className="bg-white rounded-xl border border-gray-100 p-4 text-left hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-dark-900">
                  {type.label}
                </span>
              </div>
              <p className="text-xs text-dark-400">{type.description}</p>
              {summaries[type.key] && (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  Generated
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
