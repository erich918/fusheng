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
      <span className="text-sm font-medium text-foreground">{"请选一位师父为您开示"}</span>
      <div className="grid gap-3 sm:grid-cols-3">
        {MASTERS.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => onChange(m.key)}
            className={cn(
              "flex flex-col rounded-xl border p-4 text-left transition-colors",
              value === m.key
                ? "border-gold bg-gold/10"
                : "border-border hover:border-gold/50",
            )}
          >
            <span className="text-2xl" aria-hidden>
              {m.emoji}
            </span>
            <span className="mt-2 font-heading text-lg text-foreground">{m.name}</span>
            <span className="mt-0.5 text-xs text-gold/80">{m.title}</span>
            <span className="mt-1 text-xs text-foreground/80">{m.style}</span>
            <span className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {m.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
