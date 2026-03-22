"use client"

import { ArrowRight } from "lucide-react"
import { DashboardMockup } from "@/components/DashboardMockup"
import { createClient } from "@/lib/supabase/client"

export function Hero() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-8 border border-primary-100">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            AI Powered Student Copilot
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-900 leading-[1.15] tracking-tight mb-6">
            Your assignments,
            <br />
            <span className="relative inline-block">
              <span className="font-serif italic font-normal">simplified</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 220 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 7C30 3 50 9 80 5C110 1 130 9 160 5C190 1 200 7 218 4"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-dark-500 mb-8 max-w-xl mx-auto leading-relaxed">
            ClassFlow AI syncs with Google Classroom and turns your assignments
            into clear action plans with AI summaries, checklists, and study
            guides.
          </p>

          {/* CTA */}
          <button
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: `${window.location.origin}/auth/callback`,
                  scopes:
                    "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters.readonly",
                  queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                  },
                },
              })
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-dark-900 text-white text-sm font-medium rounded-full hover:bg-dark-800 transition-colors"
          >
            Sign in with Google
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dashboard Mockup */}
        <div className="mt-16 max-w-3xl mx-auto">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
