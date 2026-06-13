"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MasterPicker } from "@/components/oracle/master-picker"
import { OracleResult, useOracle } from "@/components/oracle/oracle-result"
import { type MasterKey, SHICHEN } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export type OracleField =
  | {
      kind: "text"
      name: string
      label: string
      placeholder?: string
      optional?: boolean
    }
  | {
      kind: "textarea"
      name: string
      label: string
      placeholder?: string
      optional?: boolean
    }
  | {
      kind: "select"
      name: string
      label: string
      options: { value: string; label: string }[]
    }
  | {
      kind: "birth"
      name: string
      label: string
    }

const YEARS = Array.from({ length: 80 }, (_, i) => 2025 - i)
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

function selectClass() {
  return "w-full rounded-lg border border-input bg-background/60 px-3 py-3 text-sm text-foreground outline-none ring-ring/50 focus:ring-2"
}

export function OracleForm({
  type,
  fields,
  submitLabel,
  freeQuota,
}: {
  type: string
  fields: OracleField[]
  submitLabel: string
  freeQuota?: boolean
}) {
  const [master, setMaster] = useState<MasterKey>("huiming")
  const [values, setValues] = useState<Record<string, string>>(() => {
    const base: Record<string, string> = {}
    for (const f of fields) {
      if (f.kind === "select") base[f.name] = f.options[0].value
      else if (f.kind === "birth") {
        base.year = "1990"
        base.month = "5"
        base.day = "15"
        base.hour = SHICHEN[0]
      } else base[f.name] = ""
    }
    return base
  })
  const oracle = useOracle()

  const requiredMissing = fields.some(
    (f) => f.kind === "text" || f.kind === "textarea" ? !("optional" in f && f.optional) && !values[f.name]?.trim() : false,
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (requiredMissing) return
    oracle.ask({ type, masterKey: master, data: values })
  }

  function set(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <MasterPicker value={master} onChange={setMaster} />

      {freeQuota && (
        <div className="rounded-full border border-gold/40 bg-gold/5 px-4 py-2 text-center text-sm text-gold">
          {"今日免费 1/1"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
        {fields.map((f) => (
          <div key={f.name} className="space-y-2">
            {f.kind !== "birth" && (
              <label htmlFor={f.name} className="text-sm font-medium text-foreground">
                {f.label}
                {"optional" in f && f.optional && (
                  <span className="ml-1 text-xs text-muted-foreground">{"（选填）"}</span>
                )}
              </label>
            )}
            {f.kind === "text" && (
              <input
                id={f.name}
                value={values[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
              />
            )}
            {f.kind === "textarea" && (
              <textarea
                id={f.name}
                rows={4}
                value={values[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                className="w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
              />
            )}
            {f.kind === "select" && (
              <div className="flex flex-wrap gap-2">
                {f.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => set(f.name, o.value)}
                    className={cn(
                      "rounded-full border px-5 py-1.5 text-sm transition-colors",
                      values[f.name] === o.value
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
            {f.kind === "birth" && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <label className="space-y-1 text-xs text-muted-foreground">
                    <span>{"出生年"}</span>
                    <select value={values.year} onChange={(e) => set("year", e.target.value)} className={selectClass()}>
                      {YEARS.map((y) => (
                        <option key={y} value={String(y)}>{`${y}年`}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-1 text-xs text-muted-foreground">
                    <span>{"出生月"}</span>
                    <select value={values.month} onChange={(e) => set("month", e.target.value)} className={selectClass()}>
                      {MONTHS.map((m) => (
                        <option key={m} value={String(m)}>{`${m}月`}</option>
                      ))}
                    </select>
                  </label>
                  <label className="space-y-1 text-xs text-muted-foreground">
                    <span>{"出生日"}</span>
                    <select value={values.day} onChange={(e) => set("day", e.target.value)} className={selectClass()}>
                      {DAYS.map((d) => (
                        <option key={d} value={String(d)}>{`${d}日`}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="space-y-1 text-xs text-muted-foreground">
                  <span>{"出生时辰"}</span>
                  <select value={values.hour} onChange={(e) => set("hour", e.target.value)} className={selectClass()}>
                    {SHICHEN.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </div>
        ))}

        <Button type="submit" size="lg" disabled={oracle.loading || requiredMissing} className="w-full gap-2">
          <Sparkles className="h-4 w-4" />
          {oracle.loading ? "师父正在开示…" : submitLabel}
        </Button>
      </form>

      <OracleResult
        text={oracle.text}
        loading={oracle.loading}
        error={oracle.error}
        masterKey={master}
      />
    </div>
  )
}
