"use client"

import { AlertTriangle } from "lucide-react"

export function SeeItInAction() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight">
            See it in action.
          </h2>
          <p className="mt-3 text-dark-500">
            Follow Sarah as she conquers her week with ClassFlow AI.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-5 bottom-0 w-px bg-gray-200" />

          {/* Step 1 */}
          <div className="relative flex gap-6 mb-12">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-md shadow-primary-500/20">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-dark-900 text-lg mb-1">
                Connect Google Classroom
              </h3>
              <p className="text-sm text-dark-500 mb-4">
                Sarah signs in with Google. Four classes are imported instantly
                &mdash; no manual entry.
              </p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary-500 rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">C</span>
                  </div>
                  <span className="text-sm font-semibold text-dark-900">
                    ClassFlow AI
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-sm text-dark-500">
                      Signing in with Google..
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "AP History",
                      "Calculus II",
                      "English Lit",
                      "Chemistry",
                    ].map((cls) => (
                      <div
                        key={cls}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-sm text-dark-900">{cls}</span>
                        </div>
                        <span className="text-xs text-primary-600 font-medium">
                          Imported
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex gap-6 mb-12">
            <div className="w-10 h-10 bg-[#a08b6e] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-md shadow-[#a08b6e]/20">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-dark-900 text-lg mb-1">
                Dashboard populates instantly
              </h3>
              <p className="text-sm text-dark-500 mb-4">
                7 assignments appear, sorted by urgency. 2 are flagged as
                at-risk.
              </p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-dark-900">
                    Dashboard
                  </span>
                  <span className="text-xs text-primary-600 font-medium">
                    7 assignments
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "AP History Essay", time: "Tomorrow" },
                    { name: "Calc Problem Set 4", time: "In 2 days" },
                    { name: "English Reading Log", time: "In 4 days" },
                  ].map((a) => (
                    <div
                      key={a.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <span className="text-sm text-dark-900">{a.name}</span>
                      </div>
                      <span className="text-xs text-primary-600 font-medium">
                        {a.time}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-dark-400 text-center pt-1">
                    + 4 more assignments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex gap-6 mb-12">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-md shadow-primary-500/20">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-dark-900 text-lg mb-1">
                AI breaks down the assignment
              </h3>
              <p className="text-sm text-dark-500 mb-4">
                She clicks &apos;AP History Essay&apos; and gets a plain-English
                summary broken into 4 clear steps.
              </p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-semibold text-dark-900">
                    AI Summary &mdash; AP History Essay
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-dark-700 mb-4">
                    Write a 5-page essay analyzing the causes of the Civil War.
                    Use at least 3 primary sources.
                  </p>
                  <ol className="space-y-2.5">
                    {[
                      "Research 3 primary sources from the library database",
                      "Create a thesis statement and outline",
                      "Write the first draft (intro + 3 body paragraphs + conclusion)",
                      "Proofread, add citations in Chicago format",
                    ].map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-dark-700"
                      >
                        <span className="text-dark-400 font-medium flex-shrink-0">
                          {i + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex gap-6 mb-12">
            <div className="w-10 h-10 bg-[#a08b6e] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-md shadow-[#a08b6e]/20">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-dark-900 text-lg mb-1">
                Calendar event auto-created
              </h3>
              <p className="text-sm text-dark-500 mb-4">
                The due date is added to Google Calendar with a reminder 24
                hours before.
              </p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="text-sm">📅</span>
                  <span className="text-sm font-semibold text-dark-900">
                    Google Calendar
                  </span>
                </div>
                <div className="p-4">
                  <div
                    className="pl-3 py-2 mb-3"
                    style={{ borderLeft: "3px solid #dc2626" }}
                  >
                    <p className="font-semibold text-dark-900 text-sm">
                      AP History Essay Due
                    </p>
                    <p className="text-dark-500 text-xs">Mar 12, 11:59 PM</p>
                  </div>
                  <div className="text-sm text-dark-600">
                    <p className="font-medium">
                      Reminder: Start essay tonight
                    </p>
                    <p className="text-dark-400 text-xs">Mar 11, 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex gap-6 mb-12">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-md shadow-primary-500/20">
              <span className="text-white font-bold text-sm">5</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-dark-900 text-lg mb-1">
                Practice quiz generated
              </h3>
              <p className="text-sm text-dark-500 mb-4">
                AI reads the essay prompt and generates a 5-question quiz to
                test her knowledge before writing.
              </p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-semibold text-dark-900">
                      Practice Quiz
                    </span>
                  </div>
                  <span className="text-xs text-primary-600 font-medium">
                    5 questions
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-medium text-dark-900 text-sm mb-3">
                    Q1: What was the primary economic disagreement between the
                    North and South?
                  </p>
                  <div className="space-y-2">
                    <div className="border-2 border-green-400 bg-green-50 rounded-lg px-3 py-2 text-sm text-dark-900">
                      Correct &mdash; Tariffs and trade policy
                    </div>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-600">
                      Gold standard adoption
                    </div>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-600">
                      Railroad expansion rights
                    </div>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-dark-600">
                      Taxation of imports
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="relative flex gap-6">
            <div className="w-10 h-10 bg-[#a08b6e] rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-md shadow-[#a08b6e]/20">
              <span className="text-white font-bold text-sm">6</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-dark-900 text-lg mb-1">
                At-risk alert fires
              </h3>
              <p className="text-sm text-dark-500 mb-4">
                Dashboard updates with a warning: &apos;You&apos;re likely to
                miss this unless you start tonight.&apos;
              </p>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-dark-900">
                    At-Risk Alert
                  </span>
                </div>
                <div className="p-4">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                    <p className="text-red-600 font-semibold text-sm mb-1">
                      AP History Essay
                    </p>
                    <p className="text-dark-600 text-sm">
                      You&apos;re likely to miss this unless you start tonight.
                      Estimated effort: 4 hours.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-primary-500 text-white text-sm font-medium py-2.5 rounded-lg">
                      Start Now
                    </button>
                    <button className="border border-gray-200 text-dark-700 text-sm font-medium py-2.5 rounded-lg">
                      Remind Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
