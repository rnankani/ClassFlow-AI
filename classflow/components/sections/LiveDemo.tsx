"use client"

import { useState } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"
import {
  Sparkles,
  CheckCircle2,
  Circle,
  AlertTriangle,
  BookOpen,
  Calendar,
  ChevronRight,
  X,
} from "lucide-react"

function Math({ tex, className }: { tex: string; className?: string }) {
  const html = katex.renderToString(tex, { throwOnError: false, displayMode: false })
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

const assignments = [
  {
    id: 1,
    name: "AP History Essay",
    class: "AP History",
    due: "Tomorrow",
    urgency: "high" as const,
    dot: "bg-red-500",
    summary:
      "Write a 5-page essay analyzing the causes of the Civil War. Use at least 3 primary sources. Chicago format required.",
    checklist: [
      "Research 3 primary sources from library database",
      "Create thesis statement and outline",
      "Write intro + 3 body paragraphs + conclusion",
      "Proofread and add citations in Chicago format",
    ],
    quiz: {
      question:
        "What was the primary economic disagreement between the North and South?",
      options: [
        { text: "Tariffs and trade policy", latex: "", math: false, correct: true },
        { text: "Gold standard adoption", latex: "", math: false, correct: false },
        { text: "Railroad expansion rights", latex: "", math: false, correct: false },
        { text: "Taxation of imports", latex: "", math: false, correct: false },
      ],
    },
  },
  {
    id: 2,
    name: "Calc Problem Set 4",
    class: "Calculus II",
    due: "In 2 days",
    urgency: "medium" as const,
    dot: "bg-primary-500",
    summary:
      "Complete problems 12–28 from Chapter 7: Integration Techniques. Show all work. Focus on integration by parts and partial fractions.",
    checklist: [
      "Review integration by parts formula and examples",
      "Solve problems 12–20 (integration by parts)",
      "Solve problems 21–28 (partial fractions)",
      "Double-check answers with back-substitution",
    ],
    quiz: {
      question: "When using integration by parts, what is the formula?",
      options: [
        { text: "", latex: "\\int u\\,dv = uv - \\int v\\,du", math: true, correct: true },
        { text: "", latex: "\\int u\\,dv = uv + \\int v\\,du", math: true, correct: false },
        { text: "", latex: "\\int u\\,dv = \\frac{u}{v} - \\int \\frac{v}{du}", math: true, correct: false },
        { text: "", latex: "\\int u\\,dv = du \\cdot v - \\int u\\,dv", math: true, correct: false },
      ],
    },
  },
  {
    id: 3,
    name: "Reading Log Ch. 8",
    class: "English Lit",
    due: "In 5 days",
    urgency: "low" as const,
    dot: "bg-green-500",
    summary:
      "Read Chapter 8 of The Great Gatsby and write a 300-word reading log entry. Focus on symbolism and character development.",
    checklist: [
      "Read Chapter 8 (approx. 30 pages)",
      "Take notes on key symbols (green light, eyes of T.J. Eckleburg)",
      "Write 300-word log entry on character development",
      "Include at least 2 direct quotes with page numbers",
    ],
    quiz: {
      question: "What does the green light symbolize in The Great Gatsby?",
      options: [
        { text: "Gatsby's hope and the American Dream", latex: "", math: false, correct: true },
        { text: "Envy and jealousy", latex: "", math: false, correct: false },
        { text: "Money and wealth", latex: "", math: false, correct: false },
        { text: "Nature and the environment", latex: "", math: false, correct: false },
      ],
    },
  },
]

type Tab = "dashboard" | "summary" | "checklist" | "quiz"

export function LiveDemo() {
  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0])
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelectAssignment = (a: typeof assignments[0]) => {
    setSelectedAssignment(a)
    setActiveTab("summary")
    setCheckedItems(new Set())
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const toggleCheck = (i: number) => {
    const next = new Set(checkedItems)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setCheckedItems(next)
  }

  const handleAnswer = (i: number) => {
    setSelectedAnswer(i)
    setShowResult(true)
  }

  const urgencyBadge = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-amber-50 text-amber-600 border-amber-100",
    low: "bg-green-50 text-green-600 border-green-100",
  }
  const urgencyLabel = { high: "Urgent", medium: "Due Soon", low: "No Rush" }

  return (
    <section id="demo" className="py-20 lg:py-28 bg-warm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight">
            Try the dashboard.
          </h2>
          <p className="mt-3 text-dark-500">
            Click an assignment to see how ClassFlow AI helps you get it done.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Window chrome */}
          <div className="bg-dark-900 px-4 py-2.5 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs text-dark-400 ml-2">
              ClassFlow AI — Dashboard Demo
            </span>
          </div>

          <div className="grid md:grid-cols-5 min-h-[480px]">
            {/* Sidebar - Assignment List */}
            <div className="md:col-span-2 border-r border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-dark-900 text-sm">
                  Your Assignments
                </h3>
                <span className="text-xs text-dark-400">
                  {assignments.length} active
                </span>
              </div>

              <div className="space-y-1">
                {assignments.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleSelectAssignment(a)}
                    className={`w-full text-left p-3 rounded-xl transition-colors ${
                      selectedAssignment.id === a.id && activeTab !== "dashboard"
                        ? "bg-primary-50 border border-primary-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-2 h-2 ${a.dot} rounded-full mt-1.5 flex-shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-dark-900 text-sm truncate">
                          {a.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] text-dark-400">
                            {a.class}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${urgencyBadge[a.urgency]}`}
                          >
                            {urgencyLabel[a.urgency]}
                          </span>
                        </div>
                        <p className="text-[11px] text-dark-400 mt-0.5">
                          Due: {a.due}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-dark-300 mt-1 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>

              {/* AI Summary box */}
              <div className="mt-4 p-3 bg-gradient-to-br from-primary-50 to-amber-50 rounded-xl border border-primary-100">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                  <span className="text-[11px] font-semibold text-primary-700">
                    AI PRIORITY
                  </span>
                </div>
                <p className="text-xs text-dark-600 leading-relaxed">
                  Start with AP History Essay — it&apos;s due tomorrow and
                  needs ~4 hours. Calc can wait.
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 flex flex-col">
              {/* Tabs */}
              {activeTab !== "dashboard" && (
                <div className="border-b border-gray-100 px-4 pt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    {(["summary", "checklist", "quiz"] as Tab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab)
                          if (tab === "quiz") {
                            setSelectedAnswer(null)
                            setShowResult(false)
                          }
                        }}
                        className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
                          activeTab === tab
                            ? "bg-primary-50 text-primary-700 border border-primary-200 border-b-white -mb-px"
                            : "text-dark-400 hover:text-dark-600"
                        }`}
                      >
                        {tab === "summary" && "AI Summary"}
                        {tab === "checklist" && "Checklist"}
                        {tab === "quiz" && "Practice Quiz"}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="text-dark-400 hover:text-dark-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex-1 p-5 overflow-y-auto">
                {/* Dashboard view */}
                {activeTab === "dashboard" && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-primary-500" />
                    </div>
                    <h4 className="font-semibold text-dark-900 text-lg mb-2">
                      Select an assignment
                    </h4>
                    <p className="text-sm text-dark-400 max-w-xs">
                      Click any assignment on the left to see how ClassFlow AI
                      breaks it down, creates a checklist, and generates a
                      practice quiz.
                    </p>
                  </div>
                )}

                {/* AI Summary */}
                {activeTab === "summary" && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-primary-500" />
                      <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                        AI Summary
                      </span>
                    </div>
                    <h4 className="font-bold text-dark-900 text-lg mb-4">
                      {selectedAssignment.name}
                    </h4>
                    <p className="text-sm text-dark-600 leading-relaxed mb-6 p-4 bg-gray-50 rounded-xl">
                      {selectedAssignment.summary}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-dark-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Due: {selectedAssignment.due}
                      </span>
                      <span>•</span>
                      <span>{selectedAssignment.class}</span>
                      <span>•</span>
                      <span>
                        {selectedAssignment.checklist.length} steps
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab("checklist")}
                      className="mt-6 text-primary-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View action checklist
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Checklist */}
                {activeTab === "checklist" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-dark-900 text-lg">
                          Action Checklist
                        </h4>
                        <p className="text-xs text-dark-400 mt-0.5">
                          {selectedAssignment.name} — {checkedItems.size}/
                          {selectedAssignment.checklist.length} done
                        </p>
                      </div>
                      {checkedItems.size ===
                        selectedAssignment.checklist.length && (
                        <span className="px-2.5 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full border border-green-100">
                          Complete!
                        </span>
                      )}
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5">
                      <div
                        className="h-1.5 bg-primary-500 rounded-full transition-all duration-300"
                        style={{
                          width: `${(checkedItems.size / selectedAssignment.checklist.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      {selectedAssignment.checklist.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => toggleCheck(i)}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors ${
                            checkedItems.has(i)
                              ? "bg-green-50 border border-green-100"
                              : "bg-gray-50 border border-transparent hover:border-gray-200"
                          }`}
                        >
                          {checkedItems.has(i) ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-dark-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`text-sm ${
                              checkedItems.has(i)
                                ? "text-dark-400 line-through"
                                : "text-dark-700"
                            }`}
                          >
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practice Quiz */}
                {activeTab === "quiz" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-dark-900 text-lg">
                          Practice Quiz
                        </h4>
                        <p className="text-xs text-dark-400 mt-0.5">
                          {selectedAssignment.name}
                        </p>
                      </div>
                      <span className="text-xs text-primary-600 font-medium">
                        Q1 of 5
                      </span>
                    </div>

                    <p className="font-medium text-dark-900 text-sm mb-4">
                      {selectedAssignment.quiz.question}
                    </p>

                    <div className="space-y-2.5">
                      {selectedAssignment.quiz.options.map((opt, i) => {
                        const labels = ["A", "B", "C", "D"]
                        let style =
                          "border border-gray-200 hover:border-primary-200 hover:bg-primary-50/30"
                        let labelStyle =
                          "bg-gray-100 text-dark-500"
                        if (showResult && selectedAnswer === i) {
                          style = opt.correct
                            ? "border-2 border-green-400 bg-green-50"
                            : "border-2 border-red-300 bg-red-50"
                          labelStyle = opt.correct
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-700"
                        } else if (
                          showResult &&
                          opt.correct &&
                          selectedAnswer !== i
                        ) {
                          style = "border-2 border-green-400 bg-green-50"
                          labelStyle = "bg-green-200 text-green-800"
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => !showResult && handleAnswer(i)}
                            disabled={showResult}
                            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all flex items-center gap-3 ${style} ${
                              showResult
                                ? "cursor-default"
                                : "cursor-pointer"
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${labelStyle}`}>
                              {labels[i]}
                            </span>
                            {opt.math && opt.latex ? (
                              <Math
                                tex={opt.latex}
                                className={showResult && opt.correct ? "text-green-700" : "text-dark-700"}
                              />
                            ) : showResult && opt.correct ? (
                              <span className="text-green-700 font-medium">
                                {opt.text}
                              </span>
                            ) : (
                              <span className="text-dark-700">{opt.text}</span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {showResult && (
                      <button
                        onClick={() => {
                          setSelectedAnswer(null)
                          setShowResult(false)
                        }}
                        className="mt-4 text-primary-600 text-sm font-medium"
                      >
                        Try again
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
