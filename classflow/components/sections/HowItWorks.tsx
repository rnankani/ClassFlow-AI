"use client"

const steps = [
  {
    number: "1",
    color: "bg-primary-500",
    title: "Connect Google Classroom",
    description:
      "Sign in with Google. ClassFlow instantly pulls your classes, assignments, due dates, and submission status. No manual entry. Ever.",
  },
  {
    number: "2",
    color: "bg-[#a08b6e]",
    title: "See what matters now",
    description:
      "Your dashboard shows what's urgent, what's coming up, and what you're behind on. One glance, total clarity.",
  },
  {
    number: "3",
    color: "bg-primary-500",
    title: "Get AI-powered help",
    description:
      "Click any assignment and ClassFlow summarizes instructions, breaks them into steps, and generates practice quizzes.",
  },
  {
    number: "4",
    color: "bg-[#a08b6e]",
    title: "Automate the rest",
    description:
      "Due dates land on your calendar. Reminders fire before deadlines. Study plans write themselves. You just show up.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-warm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight text-center mb-16">
          How ClassFlow AI works
        </h2>

        <div className="grid sm:grid-cols-2 gap-x-20 gap-y-14 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-bold text-sm">
                    {step.number}
                  </span>
                </div>
                <div className="w-px flex-1 bg-dark-300 mt-2" />
              </div>
              <div className="pb-2">
                <h3 className="font-bold text-dark-900 text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-dark-500 text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
