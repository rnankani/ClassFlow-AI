"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Larger */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ClassFlow AI"
              className="w-10 h-10 rounded-xl"
            />
            <span className="font-bold text-xl text-dark-900">ClassFlow AI</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-dark-600 hover:text-primary-600 font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-dark-600 hover:text-primary-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="#demo" className="text-dark-600 hover:text-primary-600 font-medium transition-colors">
              Demo
            </a>
          </nav>

          {/* CTA Button */}
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
            className="px-5 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
