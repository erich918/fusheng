"use client"

import { useState } from "react"
import { Flame, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RELATIONS, PRAYER_LAMPS, PRAYER_DURATIONS } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export type PrayerEntry = {
  name: string
  relation: string
  lamp: string
  wish: string
  donor: string
}

export function PrayerForm({
  onOffered,
}: {
  onOffered?: (entry: PrayerEntry) => void
}) {
  const [familyName, setFamilyName] = useState("")
  const [relation, setRelation] = useState(RELATIONS[0].id)
  const [lamp, setLamp] = useState(PRAYER_LAMPS[0].id)
  const [duration, setDuration] = useState(PRAYER_DURATIONS[2].id)
  const [wish, setWish] = useState("")
  const [donor, setDonor] = useState("")
  const [lit, setLit] = useState(false)

  const price = PRAYER_DURATIONS.find((d) => d.id === duration)!.price
  const lampInfo = PRAYER_LAMPS.find((l) => l.id === lamp)!

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!familyName.trim()) return
    setLit(true)
    onOffered?.({
      name: familyName.trim(),
      relation,
      lamp: lampInfo.name,
      wish: wish.trim(),
      donor: donor.trim(),
    })
  }

  if (lit) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card/60 p-10 text-center">
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-gold/20 blur-2xl" aria-hidden />
          <Flame className="relative h-16 w-16 text-gold animate-flame" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-2xl text-gold text-glow-gold">{"灯已点亮"}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {`已为 ${familyName} 点亮一盏${lampInfo.name}，愿心愿成就，福寿安康。`}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setLit(false)
            setFamilyName("")
            setWish("")
            setDonor("")
          }}
        >
          {"再点一盏"}
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border bg-card/60 p-6 md:p-8"
    >
      <h2 className="font-heading text-2xl text-gold">{"为谁祈福"}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-foreground/85">{"家人姓名"}</span>
          <input
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="请输入家人姓名"
            className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-foreground/85">{"与您的关系"}</span>
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 focus:ring-2"
          >
            {RELATIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-foreground/85">{"选一盏灯"}</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {PRAYER_LAMPS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLamp(l.id)}
              className={cn(
                "relative flex flex-col items-center gap-1.5 rounded-xl border px-3 py-4 text-center transition-colors",
                lamp === l.id ? "border-gold bg-gold/10" : "border-border hover:border-gold/50",
              )}
            >
              {lamp === l.id && (
                <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-gold" />
              )}
              <Flame
                className={cn("h-7 w-7", lamp === l.id ? "text-gold animate-flame" : "text-gold/60")}
                strokeWidth={1.5}
              />
              <span className="font-heading text-sm text-foreground">{l.name}</span>
              <span className="text-[11px] leading-relaxed text-muted-foreground text-pretty">
                {l.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-foreground/85">{"供奉时长"}</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PRAYER_DURATIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDuration(d.id)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border px-3 py-3 transition-colors",
                duration === d.id ? "border-gold bg-gold/10" : "border-border hover:border-gold/50",
              )}
            >
              <span className="text-sm text-foreground">{d.label}</span>
              <span className="font-heading text-gold">{`¥${d.price}`}</span>
            </button>
          ))}
        </div>
      </div>

      <label className="space-y-2 text-sm">
        <span className="text-foreground/85">{"心愿（可选，最多 80 字）"}</span>
        <textarea
          value={wish}
          maxLength={80}
          onChange={(e) => setWish(e.target.value)}
          rows={2}
          placeholder="写下你想对家人说的祝福或心愿…"
          className="w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
        />
      </label>

      <label className="space-y-2 text-sm">
        <span className="text-foreground/85">{"您的称呼（可选，会显示在灯墙）"}</span>
        <input
          value={donor}
          onChange={(e) => setDonor(e.target.value)}
          placeholder="如：善信"
          className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <div>
          <p className="text-sm text-muted-foreground">{"需供奉"}</p>
          <p className="font-heading text-3xl text-gold">{`¥${price}`}</p>
        </div>
        <Button type="submit" size="lg" className="gap-2">
          <Flame className="h-4 w-4" />
          {"点亮此灯"}
        </Button>
      </div>
    </form>
  )
}
