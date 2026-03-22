"use client"

export function DashboardMockup() {
  return (
    <div className="bg-white rounded-xl shadow-2xl shadow-dark-900/10 border border-gray-200 overflow-hidden">
      {/* Window Header */}
      <div className="bg-dark-900 px-4 py-2.5 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-dark-400 ml-2">
          ClassFlow AI — Dashboard
        </span>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        {/* Today's Focus */}
        <div className="p-5">
          <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-4">
            Today&apos;s Focus
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-900 truncate">
                  AP Physics Exam &mdash; Math Quiz
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] font-medium rounded border border-red-100">
                    Urgent
                  </span>
                  <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-medium rounded border border-amber-100">
                    Due Soon
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary-400 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark-900 truncate">
                  AP US History Quiz &mdash; #15
                </p>
                <p className="text-[11px] text-dark-400 mt-0.5">Due tomorrow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-dark-300 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-dark-900 truncate">
                  Bio Lab Report &mdash; Final Review
                </p>
                <p className="text-[11px] text-dark-400 mt-0.5">Due Friday</p>
              </div>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="p-5">
          <h4 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-4">
            This Week
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-700">Calculus Problem Set</p>
              <span className="px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-medium rounded border border-amber-100">
                Due Wed
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-700">English Essay Draft</p>
              <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] font-medium rounded border border-green-100">
                No Rush
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-700">CS Project Milestone</p>
              <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] font-medium rounded border border-green-100">
                On Track
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
