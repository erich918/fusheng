"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const HEAVENLY = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
const EARTHLY = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
const ZODIAC = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]
const NAYIN = ["海中金", "炉中火", "大林木", "路旁土", "剑锋金", "山头火", "涧下水", "城头土", "白蜡金", "杨柳木", "泉中水", "屋上土", "霹雳火", "松柏木", "长流水", "砂中金", "山下火", "平地木", "壁上土", "金箔金", "佛灯火", "天河水", "大驿土", "钗钏金", "桑柘木", "大溪水", "沙中土", "天上火", "石榴木", "大海水"]
const JIANCHU = ["建", "除", "满", "平", "定", "执", "破", "危", "成", "收", "开", "闭"]
const XINGSU = ["角", "亢", "氐", "房", "心", "尾", "箕", "斗", "牛", "女", "虚", "危", "室", "壁", "奎", "娄", "胃", "昴", "毕", "觜", "参", "井", "鬼", "柳", "星", "张", "翼", "轸"]
const RATINGS = ["上上", "上吉", "中吉", "中平", "下下"]
const RATING_DESC: Record<string, string> = {
  上上: "诸事皆宜，把握良机",
  上吉: "吉星高照，宜行大事",
  中吉: "平稳可进，循序而行",
  中平: "诸事平淡，可安分",
  下下: "宜守不宜攻，凡事谨慎",
}

const YI_POOL = ["祭祀", "祈福", "出行", "嫁娶", "纳财", "开市", "动土", "安床", "入宅", "会友", "签约", "求嗣", "沐浴", "修造", "栽种", "立约", "教牛马", "断蚁", "馀事勿取", "求医", "解除", "扫舍"]
const JI_POOL = ["诉讼", "破土", "安葬", "远行", "斋醮", "移徙", "入宅", "动土", "开仓", "作灶", "纳畜", "掘井", "伐木", "出师", "嫁娶"]
const JISHEN = ["月德", "四相", "阳德", "官日", "金堂", "司命", "天恩", "母仓", "时阳", "生气", "益后", "青龙"]
const XIONGSHEN = ["月建", "小时", "土府", "月刑", "月厌", "地火", "大时", "大败", "咸池", "朱雀", "九坎", "九焦"]
const TAISHEN = ["房床碓 外正东", "占门碓 外东南", "占碓磨 外正南", "占厨灶 外西南", "仓库门 外正西", "碓磨栖 外西北"]

function seeded(n: number) {
  const x = Math.sin(n) * 10000
  return x - Math.floor(x)
}

function pick<T>(arr: T[], seed: number, count: number): T[] {
  const out: T[] = []
  const used = new Set<number>()
  let s = seed
  while (out.length < count && used.size < arr.length) {
    s += 1
    const idx = Math.floor(seeded(s) * arr.length)
    if (!used.has(idx)) {
      used.add(idx)
      out.push(arr[idx])
    }
  }
  return out
}

function ganzhiOf(day: number) {
  const gz = ((day % 60) + 60) % 60
  return { gan: gz % 10, zhi: gz % 12, name: HEAVENLY[gz % 10] + EARTHLY[gz % 12], nayin: NAYIN[gz % 30] }
}

function getAlmanac(date: Date) {
  const dayNum = Math.floor(date.getTime() / 86400000) + 8
  const d = ganzhiOf(dayNum)
  const yearGz = (date.getFullYear() - 4) % 60
  const monthGz = (date.getFullYear() * 12 + date.getMonth() + 13) % 60
  const zodiac = ZODIAC[(date.getFullYear() - 4) % 12]
  const chongZhi = (d.zhi + 6) % 12
  const seed = dayNum
  const rating = RATINGS[Math.floor(seeded(seed + 3) * RATINGS.length)]

  const hours = EARTHLY.map((zhi, i) => {
    const hgan = (d.gan % 5 * 2 + i) % 10
    const hchong = (i + 6) % 12
    return {
      name: HEAVENLY[hgan] + zhi,
      chong: `(${HEAVENLY[(hchong + 5) % 10]}${EARTHLY[hchong]})${ZODIAC[hchong]}`,
      ji: seeded(seed + i * 7) > 0.45,
    }
  })

  return {
    ganzhi: d.name,
    nayin: d.nayin,
    yearGanzhi: HEAVENLY[yearGz % 10] + EARTHLY[yearGz % 12],
    monthGanzhi: HEAVENLY[monthGz % 10] + EARTHLY[monthGz % 12],
    zodiac,
    rating,
    ratingDesc: RATING_DESC[rating],
    yi: pick(YI_POOL, seed, 4),
    ji: pick(JI_POOL, seed + 100, 4),
    jishen: pick(JISHEN, seed + 30, 6).join("、"),
    xiongshen: pick(XIONGSHEN, seed + 60, 6).join("、"),
    chong: `(${HEAVENLY[(chongZhi + 5) % 10]}${EARTHLY[chongZhi]})${ZODIAC[chongZhi]}`,
    taishen: TAISHEN[dayNum % TAISHEN.length],
    xingsu: XINGSU[dayNum % 28],
    xingsuJi: seeded(seed + 9) > 0.5 ? "吉" : "凶",
    jianchu: JIANCHU[dayNum % 12],
    hours,
    dayNum,
  }
}

const LUNAR_DAYS = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"]

export function HuangliClient() {
  const [offset, setOffset] = useState(0)
  const date = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + offset)
    d.setHours(0, 0, 0, 0)
    return d
  }, [offset])
  const a = useMemo(() => getAlmanac(date), [date])

  const week7 = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(date)
      d.setDate(d.getDate() + i)
      const al = getAlmanac(d)
      return {
        weekday: WEEKDAYS[d.getDay()],
        lunar: LUNAR_DAYS[(al.dayNum + 4) % 30],
        rating: al.rating,
        active: i === 0,
        key: al.dayNum,
      }
    })
  }, [date])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* 日期头 */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card/50 p-6">
        <Button variant="ghost" size="icon" onClick={() => setOffset((o) => o - 1)} aria-label="前一天">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-center">
          <div className="font-heading text-3xl text-gold text-glow-gold md:text-4xl">
            {`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {`星期${WEEKDAYS[date.getDay()]} · 农历${LUNAR_DAYS[(a.dayNum + 4) % 30]}`}
          </div>
          <div className="mt-1 text-xs text-gold/80">
            {`干支：${a.yearGanzhi}年 ${a.monthGanzhi}月 ${a.ganzhi}日 (${a.nayin}) · ${a.zodiac}年`}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOffset((o) => o + 1)} aria-label="后一天">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* 今日吉凶 */}
      <div className="rounded-2xl border border-gold/30 bg-card/50 p-6 text-center">
        <div className="font-heading text-2xl text-gold">{`今日 · ${a.rating}`}</div>
        <p className="mt-1 text-sm text-muted-foreground">{a.ratingDesc}</p>
      </div>

      {/* 宜 / 忌 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gold/30 bg-card/50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 font-heading text-gold">{"宜"}</span>
            <span className="text-sm text-muted-foreground">{"今日适合"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {a.yi.map((y) => (
              <span key={y} className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-sm text-foreground">{y}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-cinnabar/30 bg-card/50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cinnabar/15 font-heading text-cinnabar">{"忌"}</span>
            <span className="text-sm text-muted-foreground">{"今日避开"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {a.ji.map((j) => (
              <span key={j} className="rounded-full border border-cinnabar/30 bg-cinnabar/5 px-3 py-1 text-sm text-foreground">{j}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 神煞 · 冲煞 */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="mb-4 font-heading text-lg text-gold">{"神煞 · 冲煞"}</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-muted-foreground">{"吉神宜趋"}</span>
            <p className="mt-1 text-foreground">{a.jishen}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{"凶神宜避"}</span>
            <p className="mt-1 text-foreground">{a.xiongshen}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-3 sm:grid-cols-4">
            {[
              { label: "冲煞", value: a.chong },
              { label: "胎神方位", value: a.taishen },
              { label: "28 宿", value: `${a.xingsu} · ${a.xingsuJi}` },
              { label: "12 建除", value: a.jianchu },
            ].map((it) => (
              <div key={it.label}>
                <div className="text-xs text-muted-foreground">{it.label}</div>
                <div className="mt-1 font-heading text-base text-gold">{it.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 时辰吉凶 */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="mb-4 font-heading text-lg text-gold">{"时辰吉凶"}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {a.hours.map((h, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 text-center ${h.ji ? "border-gold/40 bg-gold/5" : "border-border bg-background/40"}`}
            >
              <div className="font-heading text-lg text-foreground">{h.name}</div>
              <div className={`text-xs ${h.ji ? "text-gold" : "text-muted-foreground"}`}>{h.ji ? "吉" : "凶"}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{`冲：${h.chong}`}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 未来七日 */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="mb-4 font-heading text-lg text-gold">{"未来七日"}</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {week7.map((w, i) => (
            <button
              key={w.key}
              type="button"
              onClick={() => setOffset((o) => o + i)}
              className={`rounded-xl border p-3 text-center transition-colors ${w.active ? "border-gold bg-gold/10" : "border-border bg-background/40 hover:border-gold/40"}`}
            >
              <div className="text-xs text-muted-foreground">{`周${w.weekday}`}</div>
              <div className="mt-1 text-sm text-foreground">{w.lunar}</div>
              <div className="mt-1 text-xs text-gold/80">{w.rating}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
