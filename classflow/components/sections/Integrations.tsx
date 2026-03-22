"use client"

const tools = [
  "Google Classroom",
  "Google Calendar",
  "Gmail",
  "Google Docs",
  "Google Drive",
  "OpenAI",
]

export function Integrations() {
  return (
    <section className="py-16 lg:py-24 bg-warm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight mb-10">
          Powered by tools you already use.
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-5 py-2.5 bg-white/60 rounded-full border border-gray-200 text-sm text-dark-700 font-medium"
            >
              {tool}
            </span>
          ))}
        </div>

        <p className="text-sm text-dark-400 max-w-xl mx-auto">
          ClassFlow connects to your existing Google Workspace. Your data stays
          yours. We read &mdash; we never modify your Classroom.
        </p>
      </div>
    </section>
  )
}
