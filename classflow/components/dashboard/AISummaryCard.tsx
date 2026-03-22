"use client"

import { useState } from "react"
import { Sparkles, RefreshCw, CheckCircle2, Lightbulb } from "lucide-react"
import { generateSummary } from "@/lib/classroom"
import type { AISummary } from "@/lib/types"
import { cn } from "@/lib/utils"

export function AISummaryCard() {
  const [summary, setSummary] = useState<AISummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setCheckedItems(new Set())
    try {
      const result = await generateSummary("daily_briefing")
      setSummary(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate")
    } finally {
      setLoading(false)
    }
  }

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-orange-50 rounded-2xl border border-primary-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-600" />
          </div>
          <h3 className="font-semibold text-dark-900">AI Daily Briefing</h3>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
          {loading ? "Generating..." : summary ? "Regenerate" : "Generate"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-3">{error}</p>
      )}

      {!summary && !loading && !error && (
        <p className="text-sm text-dark-400">
          Click &ldquo;Generate&rdquo; to get your AI-powered daily briefing based on your assignments.
        </p>
      )}

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-primary-100 rounded w-3/4" />
          <div className="h-4 bg-primary-100 rounded w-1/2" />
          <div className="h-4 bg-primary-100 rounded w-2/3" />
        </div>
      )}

      {summary && !loading && (
        <div className="space-y-4">
          {/* Summary */}
          <p className="text-sm text-dark-700 leading-relaxed">{summary.summary}</p>

          {/* Action Items */}
          {summary.action_items.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2">
                Action Items
              </h4>
              <ul className="space-y-2">
                {summary.action_items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <button
                      onClick={() => toggleCheck(i)}
                      className="mt-0.5 flex-shrink-0"
                    >
                      <CheckCircle2
                        className={cn(
                          "w-4 h-4 transition-colors",
                          checkedItems.has(i)
                            ? "text-green-500"
                            : "text-dark-300 hover:text-primary-400"
                        )}
                      />
                    </button>
                    <span
                      className={cn(
                        "text-sm transition-all",
                        checkedItems.has(i)
                          ? "text-dark-400 line-through"
                          : "text-dark-700"
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {summary.tips.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Tips
                </span>
              </div>
              <ul className="space-y-1">
                {summary.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-amber-800">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
