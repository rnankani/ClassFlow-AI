"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Badge } from "@/components/ui/Badge"
import { 
  GraduationCap, 
  Brain, 
  Users, 
  Shield, 
  Zap,
  Star 
} from "lucide-react"

const badges = [
  { icon: GraduationCap, text: "Built for modern student workflows" },
  { icon: Brain, text: "AI-powered academic productivity" },
  { icon: Users, text: "Designed for students balancing multiple classes" },
  { icon: Shield, text: "Secure Google Classroom integration" },
  { icon: Zap, text: "Real-time sync & updates" },
  { icon: Star, text: "Student-friendly interface" },
]

const stats = [
  { value: "10K+", label: "Students using ClassFlow" },
  { value: "500+", label: "Schools connected" },
  { value: "1M+", label: "Assignments organized" },
  { value: "4.9", label: "Average student rating" },
]

const testimonials = [
  {
    quote: "I went from missing deadlines every week to finishing assignments early. This is a game-changer.",
    author: "Sarah M.",
    role: "AP Student",
  },
  {
    quote: "The AI summaries actually help me understand what teachers want. My grades have never been better.",
    author: "James K.",
    role: "College Freshman",
  },
  {
    quote: "Finally, a tool that feels like it was actually made for students, not administrators.",
    author: "Emily R.",
    role: "High School Senior",
  },
]

export function SocialProof() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            Trusted & Secure
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900">
            Built for students, by students
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-3 mb-20">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge variant="primary" className="flex items-center gap-2 py-2 px-4">
                <badge.icon className="w-4 h-4" />
                {badge.text}
              </Badge>
            </motion.div>
          ))}
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.2} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-dark-600">{stat.label}</div>
            </motion.div>
          ))}
        </AnimatedSection>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.author} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-dark-900/5 border border-dark-100 h-full"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
                  ))}
                </div>
                <p className="text-dark-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900">{testimonial.author}</p>
                    <p className="text-sm text-dark-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
