"use client"

const painPoints = [
  {
    number: "01",
    title: "Assignments everywhere",
    description:
      "You have 5 classes, 20 assignments, and also lots of to-do's from Google Classroom tabs alone. That's it.",
  },
  {
    number: "02",
    title: "No smart reminders",
    description:
      "You'll forget you have something due. It's not your fault and you're probably doing it all yourself.",
  },
  {
    number: "03",
    title: "Studying feels random",
    description:
      "You've read your notes and hope for the best. There's no plan, no practice, no system.",
  },
]

export function ProblemStatement() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-900 leading-snug text-center mb-16">
          Google Classroom tells you{" "}
          <span className="relative inline-block">
            <span className="font-bold uppercase">what</span>
            <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-dark-900" />
          </span>{" "}
          is due. It
          <br className="hidden sm:block" />
          doesn&apos;t help you{" "}
          <span className="relative inline-block">
            <span className="font-bold uppercase">get it done</span>
            <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-dark-900" />
          </span>
          .
        </h2>

        <div className="space-y-8">
          {painPoints.map((point) => (
            <div key={point.number} className="flex gap-5">
              <span className="text-primary-500 font-bold text-sm mt-1 flex-shrink-0">
                {point.number}
              </span>
              <div>
                <h3 className="font-bold text-dark-900 text-lg mb-1">
                  {point.title}
                </h3>
                <p className="text-dark-500 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
