"use client"

import { useMemo, useState } from "react"
import { Flame } from "lucide-react"
import { PrayerForm, type PrayerEntry } from "./prayer-form"

type Lamp = {
  id: number
  surname: string
  donor: string
}

const SURNAMES = "何童孙赵刘腾王段郭朱周小程苑杜黄鹏付董李高".split("")

function buildSeed(): Lamp[] {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    surname: SURNAMES[i % SURNAMES.length],
    donor: "善",
  }))
}

export function PrayerWall() {
  const seed = useMemo(buildSeed, [])
  const [lamps, setLamps] = useState<Lamp[]>(seed)
  const [total, setTotal] = useState(0)
  const [today, setToday] = useState(0)

  function handleOffered(entry: PrayerEntry) {
    setLamps((prev) => [
      {
        id: Date.now(),
        surname: entry.name.slice(0, 1) || "善",
        donor: entry.donor.slice(0, 1) || "善",
      },
      ...prev,
    ])
    setTotal((n) => n + 1)
    setToday((n) => n + 1)
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-6 rounded-full border border-border bg-card/50 px-6 py-2.5 text-sm text-muted-foreground">
          <span>
            {"已点亮 "}
            <span className="font-heading text-lg text-gold">{total}</span>
            {" 盏"}
          </span>
          <span>
            {"今日新增 "}
            <span className="font-heading text-lg text-cinnabar">{today}</span>
            {" 盏"}
          </span>
        </div>
      </div>

      <PrayerForm onOffered={handleOffered} />

      <div className="rounded-2xl border border-border bg-card/60 p-6 md:p-8">
        <h2 className="font-heading text-2xl text-gold">{"功德灯墙"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{"姓名已脱敏处理 · 心诚则灵"}</p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {lamps.map((lamp) => (
            <li
              key={lamp.id}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-background/40 p-4 text-center transition-colors hover:border-gold/50"
            >
              <Flame className="h-7 w-7 text-gold animate-flame" strokeWidth={1.5} />
              <span className="font-heading text-xl text-foreground">
                {lamp.surname}
                <span className="text-muted-foreground">*</span>
              </span>
              <span className="text-[11px] text-muted-foreground">
                {`${lamp.donor}** 为 ${lamp.surname}** 敬奉`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
