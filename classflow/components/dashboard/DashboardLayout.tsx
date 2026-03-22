"use client"

import { Sidebar } from "./Sidebar"
import type { UserProfile } from "@/lib/types"
import type { User } from "@supabase/supabase-js"

interface DashboardLayoutProps {
  profile: UserProfile | null
  user: User
  children: React.ReactNode
}

export function DashboardLayout({ profile, user, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      <Sidebar
        profile={profile}
        userEmail={user.email || ""}
        avatarUrl={profile?.avatar_url || user.user_metadata?.avatar_url}
      />
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
