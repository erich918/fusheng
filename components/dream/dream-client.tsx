"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MasterPicker } from "@/components/oracle/master-picker"
import { OracleResult, useOracle } from "@/components/oracle/oracle-result"
import { DREAM_CATEGORIES, DREAM_ENTRIES } from "@/lib/site-data"
import type { MasterKey } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const RATING_COLOR: Record<string, string> = {
  上上: "text-gold",
  上吉: "text-gold/90",
  中吉: "text-foreground",
  中平: "text-muted-foreground",
  下下: "text-cinnabar",
}

export function DreamClient() {
  const [tab, setTab] = useState<"ask" | "browse">("ask")
  const [master, setMaster] = useState<MasterKey>("huiming")
  const [dream, setDream] = useState("")
  const oracle = useOracle()

  function handleAsk(e: React.FormEvent) {
    e.preventDefault()
    if (!dream.trim()) return
    oracle.ask({ type: "dream", masterKey: master, data: { dream } })
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Tabs */}
      <div className="flex gap-2 rounded-full border border-border bg-card/40 p-1">
        {[
          { id: "ask" as const, label: "解梦" },
          { id: "browse" as const, label: "按类查梦" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 rounded-full px-4 py-2 text-sm transition-colors",
              tab === t.id ? "bg-gold/15 text-gold" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "ask" ? (
        <>
          <MasterPicker value={master} onChange={setMaster} />
          <form onSubmit={handleAsk} className="space-y-4 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
            <label htmlFor="dream" className="text-sm font-medium text-foreground">
              {"请描述您梦中所见"}
            </label>
            <textarea
              id="dream"
              rows={4}
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="请尽量详细地描述你昨夜或近日的梦境…"
              className="w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
            />
            <Button type="submit" size="lg" disabled={oracle.loading || !dream.trim()} className="w-full gap-2">
              <Sparkles className="h-4 w-4" />
              {oracle.loading ? "师父正在开示…" : "请师父解梦"}
            </Button>
          </form>
          <OracleResult text={oracle.text} loading={oracle.loading} error={oracle.error} masterKey={master} />
        </>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="mb-3 font-heading text-lg text-gold">{"按类查梦"}</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {DREAM_CATEGORIES.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/40 px-3 py-4 transition-colors hover:border-gold/50"
                >
                  <span className="text-2xl" aria-hidden>{c.emoji}</span>
                  <span className="text-xs text-foreground">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-lg text-gold">{"热门梦境"}</h2>
            <ul className="space-y-3">
              {DREAM_ENTRIES.map((d) => (
                <li key={d.title} className="rounded-xl border border-border bg-card/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-base text-foreground">{d.title}</span>
                    <span className={cn("text-sm font-medium", RATING_COLOR[d.rating])}>{d.rating}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{d.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
