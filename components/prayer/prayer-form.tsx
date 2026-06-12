"use client"

import { useState } from "react"
import { Heart, Flame, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blessingTypes } from "@/lib/site-data"
import { cn } from "@/lib/utils"

type LampColor = {
  id: string
  name: string
  className: string
}

const lampColors: LampColor[] = [
  { id: "gold", name: "祈福金灯", className: "text-gold" },
  { id: "red", name: "鸿运红灯", className: "text-cinnabar" },
  { id: "jade", name: "安康青灯", className: "text-[oklch(0.7_0.1_160)]" },
]

export function PrayerForm({
  onOffered,
}: {
  onOffered?: (entry: { name: string; wish: string; blessing: string }) => void
}) {
  const [familyName, setFamilyName] = useState("")
  const [blessing, setBlessing] = useState(blessingTypes[0].id)
  const [wish, setWish] = useState("")
  const [lamp, setLamp] = useState(lampColors[0].id)
  const [lit, setLit] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!familyName.trim()) return
    setLit(true)
    onOffered?.({
      name: familyName.trim(),
      wish: wish.trim() || blessingTypes.find((b) => b.id === blessing)!.label,
      blessing,
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
            {`已为 ${familyName} 点亮一盏${lampColors.find((l) => l.id === lamp)!.name}，愿心愿成就，福寿安康。`}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setLit(false)
            setFamilyName("")
            setWish("")
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
      <div className="space-y-2">
        <label htmlFor="familyName" className="text-sm font-medium text-foreground">
          {"为谁祈福"}
        </label>
        <input
          id="familyName"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="请输入家人或自己的称呼"
          className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
        />
      </div>

      <div className="space-y-3">
        <span className="text-sm font-medium text-foreground">{"祈愿类别"}</span>
        <div className="flex flex-wrap gap-2">
          {blessingTypes.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBlessing(b.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                blessing === b.id
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-sm font-medium text-foreground">{"选择灯色"}</span>
        <div className="grid grid-cols-3 gap-3">
          {lampColors.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLamp(l.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border px-3 py-4 transition-colors",
                lamp === l.id ? "border-gold bg-gold/10" : "border-border hover:border-gold/50",
              )}
            >
              <Flame className={cn("h-7 w-7", l.className)} strokeWidth={1.5} />
              <span className="text-xs text-muted-foreground">{l.name}</span>
              {lamp === l.id && <Check className="h-3.5 w-3.5 text-gold" />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="wish" className="text-sm font-medium text-foreground">
          {"心愿祝祷"}
          <span className="ml-1 text-xs text-muted-foreground">{"（选填）"}</span>
        </label>
        <textarea
          id="wish"
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          rows={3}
          placeholder="写下你想对家人说的祝福或心愿…"
          className="w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
        />
      </div>

      <Button type="submit" size="lg" className="w-full gap-2">
        <Heart className="h-4 w-4" />
        {"点亮心灯"}
      </Button>
    </form>
  )
}
