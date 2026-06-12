"use client"

import { useState } from "react"
import { ScrollText, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MasterPicker } from "@/components/oracle/master-picker"
import { OracleResult, useOracle } from "@/components/oracle/oracle-result"
import { LOTTERY_SIGNS, type LotterySign, type MasterKey } from "@/lib/site-data"

export function LotteryClient() {
  const [master, setMaster] = useState<MasterKey>("huiming")
  const [question, setQuestion] = useState("")
  const [sign, setSign] = useState<LotterySign | null>(null)
  const [shaking, setShaking] = useState(false)
  const oracle = useOracle()

  function drawSign() {
    setShaking(true)
    oracle.reset()
    setSign(null)
    setTimeout(() => {
      const picked = LOTTERY_SIGNS[Math.floor(Math.random() * LOTTERY_SIGNS.length)]
      setSign(picked)
      setShaking(false)
      oracle.ask({
        type: "lottery",
        masterKey: master,
        data: {
          number: String(picked.number),
          signType: picked.signType,
          signName: picked.signName,
          verse: picked.verse,
          question,
        },
      })
    }, 1100)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <MasterPicker value={master} onChange={setMaster} />

      <div className="space-y-2">
        <label htmlFor="q" className="text-sm font-medium text-foreground">
          {"心中所问"}
          <span className="ml-1 text-xs text-muted-foreground">{"（选填）"}</span>
        </label>
        <input
          id="q"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="如：近期事业是否顺遂？"
          className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none ring-ring/50 placeholder:text-muted-foreground focus:ring-2"
        />
      </div>

      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card/40 p-8">
        <div
          className={
            "flex h-40 w-28 flex-col items-center justify-center rounded-lg border border-gold/40 bg-gradient-to-b from-card to-background text-center transition-transform " +
            (shaking ? "animate-[wiggle_0.2s_ease-in-out_infinite]" : "")
          }
          style={{ transformOrigin: "bottom center" }}
        >
          {sign ? (
            <div className="space-y-1 px-2">
              <div className="text-xs text-gold/80">{sign.signType}</div>
              <div className="font-heading text-2xl text-gold">{`第${sign.number}签`}</div>
              <div className="text-xs text-muted-foreground">{sign.signName}</div>
            </div>
          ) : (
            <ScrollText className="h-10 w-10 text-gold/60" strokeWidth={1.25} />
          )}
        </div>

        {sign && (
          <p className="max-w-md text-center text-sm leading-loose text-foreground/80 text-pretty">
            {sign.verse}
          </p>
        )}

        <Button onClick={drawSign} disabled={shaking || oracle.loading} size="lg" className="gap-2">
          <RefreshCw className={"h-4 w-4 " + (shaking ? "animate-spin" : "")} />
          {sign ? "再求一签" : "诚心求签"}
        </Button>
      </div>

      <OracleResult
        text={oracle.text}
        loading={oracle.loading}
        error={oracle.error}
        masterKey={master}
      />
    </div>
  )
}
