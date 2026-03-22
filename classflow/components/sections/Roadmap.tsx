"use client"

const roadmapItems = [
  {
    label: "70% DONE",
    labelColor: "bg-green-100 text-green-700",
    title: "Parent/Family Digest",
    description:
      "Weekly summary for parents showing past assignments, what's in progress, and what's coming up.",
  },
  {
    label: "40% DONE",
    labelColor: "bg-amber-100 text-amber-700",
    title: "Study Group Mode",
    description:
      "Collaborative study planning with classmates, shared study guides, and group accountability.",
  },
  {
    label: "20% DONE",
    labelColor: "bg-primary-100 text-primary-700",
    title: "Multi-Platform Apps",
    description:
      "Native iOS and Android apps so ClassFlow is always in your pocket when you need it.",
  },
]

export function Roadmap() {
  return (
    <section className="py-20 lg:py-28 bg-warm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight">
            And we&apos;re just getting started.
          </h2>
          <p className="mt-3 text-dark-500">
            Here&apos;s what&apos;s next on our roadmap.
          </p>
        </div>

        <div className="space-y-4">
          {roadmapItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 items-start"
            >
              <span
                className={`px-2.5 py-1 text-[11px] font-bold rounded-full flex-shrink-0 ${item.labelColor}`}
              >
                {item.label}
              </span>
              <div>
                <h3 className="font-bold text-dark-900 mb-1">{item.title}</h3>
                <p className="text-sm text-dark-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
