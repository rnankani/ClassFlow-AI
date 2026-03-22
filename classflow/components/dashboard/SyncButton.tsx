"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { syncClassroom } from "@/lib/classroom"
import { cn } from "@/lib/utils"

interface SyncButtonProps {
  onSyncComplete?: () => void
}

export function SyncButton({ onSyncComplete }: SyncButtonProps) {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSync = async () => {
    setSyncing(true)
    setError(null)
    try {
      const result = await syncClassroom()
      setLastSync(result.synced_at)
      onSyncComplete?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed")
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleSync}
        disabled={syncing}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
          syncing
            ? "bg-gray-50 text-dark-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-dark-700 border-gray-200 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200"
        )}
      >
        <RefreshCw className={cn("w-4 h-4", syncing && "animate-spin")} />
        {syncing ? "Syncing..." : "Sync Classroom"}
      </button>
      {lastSync && (
        <span className="text-xs text-dark-400">
          Last synced {new Date(lastSync).toLocaleTimeString()}
        </span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
