"use client"

import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 leading-tight tracking-tight mb-6">
          Be the first to never miss an
          <br className="hidden sm:block" />
          assignment again.
        </h2>

        <p className="text-dark-500 mb-8 max-w-xl mx-auto leading-relaxed">
          ClassFlow AI is launching soon. Join now to get early access before
          your classmates do.
        </p>

        <button
          onClick={async () => {
            const supabase = createClient()
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/auth/callback` },
            })
          }}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 text-white text-sm font-medium rounded-full hover:bg-primary-600 transition-colors"
        >
          Join the Waitlist
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="mt-5 text-xs text-dark-400">
          No spam, just a heads up when it&apos;s ready.
        </p>
      </div>
    </section>
  )
}
