"use client"

import { MASTERS, type MasterKey } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function MasterPicker({
  value,
  onChange,
}: {
  value: MasterKey
  onChange: (key: MasterKey) => void
}) {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-foreground">{"选择为你开示的师父"}</span>
      <div className="grid gap-3 sm:grid-cols-3">
        {MASTERS.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => onChange(m.key)}
            className={cn(
              "rounded-xl border p-4 text-left transition-colors",
              value === m.key
                ? "border-gold bg-gold/10"
                : "border-border hover:border-gold/50",
            )}
          >
            <span className="font-heading text-lg text-foreground">{m.name}</span>
            <span className="mt-1 block text-xs text-gold/80">{m.title}</span>
            <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
              {m.style}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
