"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const HEAVENLY = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const EARTHLY = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
const ZODIAC = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]

const YI_POOL = [
  "祭祀", "祈福", "出行", "嫁娶", "纳财", "开市", "动土", "安床",
  "入宅", "会友", "签约", "求嗣", "沐浴", "修造", "栽种", "立约",
]
const JI_POOL = [
  "诉讼", "破土", "安葬", "远行", "动土", "嫁娶", "开仓", "作灶",
  "纳畜", "掘井", "伐木", "出师",
]
const ZEN_TIPS = [
  "今日宜静心，万事从容则吉。",
  "心存善念，所遇皆是良缘。",
  "凡事留三分余地，福气自来。",
  "少言多行，是日精进之道。",
  "遇事先问本心，不为外境所扰。",
  "一茶一饭皆是修行，专注当下。",
  "宽以待人，是今日最好的功课。",
]

function seeded(n: number) {
  const x = Math.sin(n) * 10000
  return x - Math.floor(x)
}

function pick<T>(arr: T[], seed: number, count: number): T[] {
  const out: T[] = []
  const used = new Set<number>()
  let s = seed
  while (out.length < count) {
    s += 1
    const idx = Math.floor(seeded(s) * arr.length)
    if (!used.has(idx)) {
      used.add(idx)
      out.push(arr[idx])
    }
  }
  return out
}

function getAlmanac(date: Date) {
  const dayNum = Math.floor(date.getTime() / 86400000)
  const gz = (dayNum + 8) % 60
  const ganzhi = HEAVENLY[gz % 10] + EARTHLY[gz % 12]
  const yearGz = (date.getFullYear() - 4) % 60
  const yearGanzhi = HEAVENLY[yearGz % 10] + EARTHLY[yearGz % 12]
  const zodiac = ZODIAC[(date.getFullYear() - 4) % 12]
  const chongZodiac = ZODIAC[(gz % 12 + 6) % 12]
  const seed = dayNum
  return {
    ganzhi,
    yearGanzhi,
    zodiac,
    chong: `冲${chongZodiac}`,
    yi: pick(YI_POOL, seed, 5),
    ji: pick(JI_POOL, seed + 100, 4),
    luckyHour: EARTHLY[Math.floor(seeded(seed + 7) * 12)] + "时",
    luckyDir: ["正东", "正南", "正西", "正北", "东南", "西南", "东北", "西北"][
      Math.floor(seeded(seed + 13) * 8)
    ],
    fortune: Math.floor(seeded(seed + 21) * 40) + 60,
    tip: ZEN_TIPS[dayNum % ZEN_TIPS.length],
  }
}

export function HuangliClient() {
  const [offset, setOffset] = useState(0)
  const date = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + offset)
    d.setHours(0, 0, 0, 0)
    return d
  }, [offset])
  const a = useMemo(() => getAlmanac(date), [date])

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card/50 p-6">
        <Button variant="ghost" size="icon" onClick={() => setOffset((o) => o - 1)} aria-label="前一天">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <div className="font-heading text-4xl text-gold text-glow-gold md:text-5xl">
            {date.getMonth() + 1}
            <span className="mx-1 text-2xl">{"月"}</span>
            {date.getDate()}
            <span className="ml-1 text-2xl">{"日"}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {`${date.getFullYear()}年 · 星期${WEEKDAYS[date.getDay()]}`}
          </div>
          <div className="mt-1 text-sm text-gold/80">
            {`${a.yearGanzhi}年【${a.zodiac}】· ${a.ganzhi}日`}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOffset((o) => o + 1)} aria-label="后一天">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gold/30 bg-card/50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 font-heading text-gold">
              {"宜"}
            </span>
            <span className="text-sm text-muted-foreground">{"今日适宜"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {a.yi.map((y) => (
              <span key={y} className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-sm text-foreground">
                {y}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-cinnabar/30 bg-card/50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cinnabar/15 font-heading text-cinnabar">
              {"忌"}
            </span>
            <span className="text-sm text-muted-foreground">{"今日忌讳"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {a.ji.map((j) => (
              <span key={j} className="rounded-full border border-cinnabar/30 bg-cinnabar/5 px-3 py-1 text-sm text-foreground">
                {j}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "吉时", value: a.luckyHour },
          { label: "吉位", value: a.luckyDir },
          { label: "冲煞", value: a.chong },
          { label: "今日运势", value: `${a.fortune}分` },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card/40 p-4 text-center">
            <div className="text-xs text-muted-foreground">{item.label}</div>
            <div className="mt-1 font-heading text-xl text-gold">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-6">
        <Sun className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
        <div>
          <div className="text-sm font-medium text-foreground">{"师父今日寄语"}</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{a.tip}</p>
        </div>
      </div>
    </div>
  )
}
