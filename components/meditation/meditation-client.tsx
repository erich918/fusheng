"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DURATIONS = [
  { label: "3 分钟", value: 180 },
  { label: "5 分钟", value: 300 },
  { label: "10 分钟", value: 600 },
]

// 4-7-8 呼吸法：吸气 4 秒，屏息 7 秒，呼气 8 秒
const PHASES = [
  { name: "吸气", seconds: 4 },
  { name: "屏息", seconds: 7 },
  { name: "呼气", seconds: 8 },
] as const

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export function MeditationClient() {
  const [total, setTotal] = useState(300)
  const [remaining, setRemaining] = useState(300)
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [phaseLeft, setPhaseLeft] = useState(PHASES[0].seconds)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) return
    timer.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false)
          return 0
        }
        return r - 1
      })
      setPhaseLeft((p) => {
        if (p <= 1) {
          setPhaseIdx((i) => (i + 1) % PHASES.length)
          return PHASES[(phaseIdxRef.current + 1) % PHASES.length].seconds
        }
        return p - 1
      })
    }, 1000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [running])

  // keep a ref of phaseIdx for use inside interval
  const phaseIdxRef = useRef(phaseIdx)
  useEffect(() => {
    phaseIdxRef.current = phaseIdx
  }, [phaseIdx])

  function reset(newTotal = total) {
    setRunning(false)
    setTotal(newTotal)
    setRemaining(newTotal)
    setPhaseIdx(0)
    setPhaseLeft(PHASES[0].seconds)
  }

  const phase = PHASES[phaseIdx]
  const progress = total > 0 ? (total - remaining) / total : 0

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-8">
      <div className="flex gap-2">
        {DURATIONS.map((d) => (
          <button
            key={d.value}
            onClick={() => reset(d.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              total === d.value
                ? "border-gold bg-gold/15 text-gold"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="relative flex h-72 w-72 items-center justify-center">
        <div
          className={cn(
            "absolute rounded-full bg-gold/10 transition-all duration-1000 ease-in-out",
            running && phase.name === "吸气" && "h-72 w-72",
            running && phase.name === "屏息" && "h-72 w-72",
            running && phase.name === "呼气" && "h-44 w-44",
            !running && "h-56 w-56",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "absolute rounded-full border border-gold/40 transition-all duration-1000 ease-in-out",
            running && phase.name !== "呼气" ? "h-60 w-60" : "h-40 w-40",
          )}
          aria-hidden
        />
        <div className="relative z-10 text-center">
          <div className="font-heading text-2xl text-gold text-glow-gold">
            {running ? phase.name : "静心"}
          </div>
          <div className="mt-2 font-heading text-4xl text-foreground">{fmt(remaining)}</div>
          {running && (
            <div className="mt-1 text-sm text-muted-foreground">{`${phaseLeft}s`}</div>
          )}
        </div>
      </div>

      <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-gold transition-all duration-1000"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="lg"
          className="gap-2"
          onClick={() => {
            if (remaining === 0) reset()
            setRunning((r) => !r)
          }}
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "暂停" : remaining === total ? "开始静坐" : "继续"}
        </Button>
        <Button variant="outline" size="lg" className="gap-2" onClick={() => reset()}>
          <RotateCcw className="h-4 w-4" />
          {"重置"}
        </Button>
      </div>

      <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground text-pretty">
        {"跟随光圈起伏，循 4-7-8 呼吸法：吸气四息，屏息七息，呼气八息。调息观心，让浮躁归于宁静。"}
      </p>
    </div>
  )
}
