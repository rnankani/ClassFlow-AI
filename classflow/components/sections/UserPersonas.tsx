"use client"

const personas = [
  {
    number: "01",
    numberColor: "text-primary-500",
    title: "The Overwhelmed One",
    description:
      "5 classes, 20 tabs, zero plan. ClassFlow picks your battles so you don't burn out.",
    bgColor: "bg-[#f5ede3]",
    barColor: "bg-primary-500",
  },
  {
    number: "02",
    numberColor: "text-[#a08b6e]",
    title: "The Last-Minuter",
    description:
      "You know what's due. You just... don't start. ClassFlow makes the first step stupidly easy.",
    bgColor: "bg-[#f5ede3]",
    barColor: "bg-primary-500",
  },
  {
    number: "03",
    numberColor: "text-[#4a6741]",
    title: "The Overachiever",
    description:
      "You're already on it. ClassFlow catches the one thing you'd have missed at 2 AM.",
    bgColor: "bg-[#dde8d5]",
    barColor: "bg-[#4a6741]",
  },
]

export function UserPersonas() {
  return (
    <section className="py-20 lg:py-28 bg-warm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 tracking-tight text-center mb-14">
          Who actually uses this?
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {personas.map((persona) => (
            <div
              key={persona.number}
              className={`${persona.bgColor} rounded-2xl p-6 pb-0 overflow-hidden flex flex-col`}
            >
              <span
                className={`${persona.numberColor} font-bold text-4xl mb-4`}
              >
                {persona.number}
              </span>
              <h3 className="font-bold text-dark-900 text-xl mb-3">
                {persona.title}
              </h3>
              <p className="text-dark-600 text-[15px] leading-relaxed flex-1 mb-6">
                {persona.description}
              </p>
              <div className={`${persona.barColor} h-1.5 rounded-t-full -mx-6`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
