"use client"

import { useState } from "react"
import { Flame } from "lucide-react"
import { PrayerForm } from "./prayer-form"

type Lamp = {
  id: number
  name: string
  wish: string
}

const seedLamps: Lamp[] = [
  { id: 1, name: "母亲", wish: "愿身体安康，岁岁平安" },
  { id: 2, name: "全家", wish: "阖家顺遂，福寿绵长" },
  { id: 3, name: "孩儿", wish: "学业有成，金榜题名" },
  { id: 4, name: "爱人", wish: "情深意笃，白首不离" },
  { id: 5, name: "自己", wish: "心宽体健，万事胜意" },
  { id: 6, name: "父亲", wish: "福如东海，寿比南山" },
  { id: 7, name: "挚友", wish: "前程似锦，所求皆得" },
  { id: 8, name: "众生", wish: "离苦得乐，善缘常伴" },
]

export function PrayerWall() {
  const [lamps, setLamps] = useState<Lamp[]>(seedLamps)

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <PrayerForm
          onOffered={(entry) =>
            setLamps((prev) => [
              { id: Date.now(), name: entry.name, wish: entry.wish },
              ...prev,
            ])
          }
        />
      </div>

      <div>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-heading text-xl text-gold">{"祈福灯墙"}</h2>
          <span className="text-xs text-muted-foreground">{`已点亮 ${lamps.length} 盏心灯`}</span>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {lamps.map((lamp) => (
            <li
              key={lamp.id}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 p-5 text-center transition-colors hover:border-gold/50"
            >
              <span className="relative">
                <span className="absolute -inset-3 rounded-full bg-gold/15 blur-lg transition-opacity group-hover:opacity-100" aria-hidden />
                <Flame className="relative h-8 w-8 text-gold animate-flame" strokeWidth={1.5} />
              </span>
              <span className="font-heading text-base text-foreground">{lamp.name}</span>
              <span className="text-xs leading-relaxed text-muted-foreground text-pretty">
                {lamp.wish}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
