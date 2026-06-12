"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MasterPicker } from "@/components/oracle/master-picker"
import { OracleResult, useOracle } from "@/components/oracle/oracle-result"
import type { MasterKey } from "@/lib/site-data"
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

export function OracleForm({
  type,
  fields,
  submitLabel,
}: {
  type: string
  fields: OracleField[]
  submitLabel: string
}) {
  const [master, setMaster] = useState<MasterKey>("huiming")
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((f) => [f.name, f.kind === "select" ? f.options[0].value : ""]),
    ),
  )
  const oracle = useOracle()

  const requiredMissing = fields.some(
    (f) => f.kind !== "select" && !f.optional && !values[f.name]?.trim(),
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (requiredMissing) return
    oracle.ask({ type, masterKey: master, data: values })
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <MasterPicker value={master} onChange={setMaster} />

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
        {fields.map((f) => (
          <div key={f.name} className="space-y-2">
            <label htmlFor={f.name} className="text-sm font-medium text-foreground">
              {f.label}
              {"optional" in f && f.optional && (
                <span className="ml-1 text-xs text-muted-foreground">{"（选填）"}</span>
              )}
            </label>
            {f.kind === "text" && (
              <input
                id={f.name}
                value={values[f.name]}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
              />
            )}
            {f.kind === "textarea" && (
              <textarea
                id={f.name}
                rows={4}
                value={values[f.name]}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
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
                    onClick={() => setValues((v) => ({ ...v, [f.name]: o.value }))}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
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
