"use client"

import { Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react"

export function FeatureShowcase() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight text-center mb-14">
          Everything a student actually needs.
        </h2>

        {/* Row 1: Smart Dashboard + AI Summarizer */}
        <div className="grid md:grid-cols-5 gap-5 mb-5">
          {/* Smart Dashboard - wider */}
          <div className="md:col-span-3 border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-bold text-dark-900 text-lg mb-1">
              Smart Dashboard
            </h3>
            <p className="text-dark-500 text-sm mb-5">
              Every assignment, every class. Sorted by what matters right now.
            </p>
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <span className="px-3.5 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                All
              </span>
              <span className="px-3.5 py-1 bg-gray-100 text-dark-500 text-xs font-medium rounded-full">
                Urgent
              </span>
              <span className="px-3.5 py-1 bg-gray-100 text-dark-500 text-xs font-medium rounded-full">
                This Week
              </span>
            </div>
            {/* Assignment list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                  <span className="font-medium text-dark-900 text-sm">
                    AP History Essay
                  </span>
                  <span className="text-dark-400 text-sm">AP History</span>
                </div>
                <span className="text-primary-600 text-sm font-medium">
                  Tomorrow
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                  <span className="font-medium text-dark-900 text-sm">
                    Problem Set 4
                  </span>
                  <span className="text-dark-400 text-sm">Calculus II</span>
                </div>
                <span className="text-primary-600 text-sm font-medium">
                  In 2 days
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <span className="font-medium text-dark-900 text-sm">
                    Reading Log Ch. 8
                  </span>
                  <span className="text-dark-400 text-sm">English Lit</span>
                </div>
                <span className="text-green-600 text-sm font-medium">
                  In 5 days
                </span>
              </div>
            </div>
          </div>

          {/* AI Summarizer - narrower */}
          <div className="md:col-span-2 border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-bold text-dark-900 text-lg mb-1">
              AI Summarizer
            </h3>
            <p className="text-dark-500 text-sm mb-5">
              3-page rubric to plain English in seconds.
            </p>
            {/* Skeleton lines */}
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div className="h-2.5 bg-gray-300 rounded-full w-full" />
                <div className="h-2.5 bg-gray-300 rounded-full w-[90%]" />
                <div className="h-2.5 bg-gray-300 rounded-full w-[75%]" />
              </div>
            </div>
            {/* Summarizing indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-primary-600 text-sm font-medium">
                Summarizing...
              </span>
            </div>
            {/* Key requirements */}
            <div>
              <p className="text-primary-600 text-sm font-semibold mb-2">
                Key requirements:
              </p>
              <ol className="text-sm text-dark-700 space-y-1 list-decimal list-inside">
                <li>5-page essay, Chicago format</li>
                <li>Min. 3 primary sources</li>
                <li>Thesis in first paragraph</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Row 2: Auto Study Plans + Practice Quizzes + Calendar Sync */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {/* Auto Study Plans */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-bold text-dark-900 text-lg mb-1">
              Auto Study Plans
            </h3>
            <p className="text-dark-500 text-sm mb-5">
              Day-by-day schedules that adapt when things change.
            </p>
            <div className="space-y-2.5">
              {[
                { day: "Mon", task: "Research sources", color: "bg-primary-400" },
                { day: "Tue", task: "Write outline", color: "bg-primary-400" },
                { day: "Wed", task: "Calc practice", color: "bg-green-500" },
                { day: "Thu", task: "Draft essay", color: "bg-blue-500" },
              ].map((item) => (
                <div key={item.day} className="flex items-center gap-3">
                  <span className="text-sm text-dark-400 w-8 flex-shrink-0">
                    {item.day}
                  </span>
                  <div
                    className={`${item.color} rounded-md px-3 py-1.5 text-white text-xs font-medium flex-1`}
                  >
                    {item.task}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Quizzes */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-bold text-dark-900 text-lg mb-1">
              Practice Quizzes
            </h3>
            <p className="text-dark-500 text-sm mb-5">
              Test yourself before the real thing.
            </p>
            <p className="font-semibold text-dark-900 text-sm mb-3">
              What caused the Missouri Compromise?
            </p>
            <div className="space-y-2">
              <div className="border-2 border-green-400 bg-green-50 rounded-lg px-3 py-2 text-sm text-dark-900 font-medium">
                Correct &mdash; Slavery expansion dispute
              </div>
              <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-600">
                Trade disagreements
              </div>
              <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-600">
                Tax policy conflict
              </div>
            </div>
          </div>

          {/* Calendar Sync */}
          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <h3 className="font-bold text-dark-900 text-lg mb-1">
              Calendar Sync
            </h3>
            <p className="text-dark-500 text-sm mb-5">
              Due dates become calendar events automatically.
            </p>
            {/* Mini calendar */}
            <div className="mb-4">
              <div className="grid grid-cols-5 gap-1 text-center text-xs text-dark-400 mb-2">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
              </div>
              <div className="grid grid-cols-5 gap-1 text-center text-sm">
                <span className="py-1.5 rounded-lg text-dark-700">10</span>
                <span className="py-1.5 rounded-lg text-dark-700">11</span>
                <span className="py-1.5 rounded-lg bg-primary-500 text-white font-medium">
                  12
                </span>
                <span className="py-1.5 rounded-lg text-dark-700">13</span>
                <span className="py-1.5 rounded-lg text-dark-700">14</span>
              </div>
            </div>
            {/* Event */}
            <div className="border-l-3 border-l-primary-500 pl-3 py-1" style={{ borderLeftWidth: '3px' }}>
              <p className="font-medium text-dark-900 text-sm">
                AP History Essay
              </p>
              <p className="text-dark-400 text-xs">Due Mar 12 at 11:59 PM</p>
            </div>
          </div>
        </div>

        {/* Row 3: At-Risk Alerts */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <h3 className="font-bold text-dark-900 text-lg mb-1">
            At-Risk Alerts
          </h3>
          <p className="text-dark-500 text-sm mb-5">
            Detects assignments you&apos;re likely to miss before it&apos;s too
            late.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-dark-900 text-sm">
                    AP History Essay
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[11px] font-semibold rounded-full">
                    High Risk
                  </span>
                </div>
                <p className="text-dark-500 text-sm">
                  Due tomorrow. No submission detected. Estimated effort: 4
                  hours. Start now to avoid missing this deadline.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-dark-900 text-sm">
                    Calc Problem Set 4
                  </span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[11px] font-semibold rounded-full">
                    On Track
                  </span>
                </div>
                <p className="text-dark-500 text-sm">
                  Due in 3 days. Draft submitted. You&apos;re in good shape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
