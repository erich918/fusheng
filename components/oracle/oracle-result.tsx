"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { MASTERS, type MasterKey } from "@/lib/site-data"

export function useOracle() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function ask(payload: {
    type: string
    data: Record<string, string>
    masterKey: MasterKey
  }) {
    setLoading(true)
    setError(false)
    setText("")
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok || !res.body) throw new Error("failed")
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setText(acc)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setText("")
    setError(false)
    setLoading(false)
  }

  return { text, loading, error, ask, reset }
}

export function OracleResult({
  text,
  loading,
  error,
  masterKey,
}: {
  text: string
  loading: boolean
  error: boolean
  masterKey: MasterKey
}) {
  const master = MASTERS.find((m) => m.key === masterKey)

  if (!loading && !text && !error) return null

  return (
    <div className="rounded-2xl border border-gold/30 bg-card/60 p-6 md:p-8">
      <div className="mb-4 flex items-center gap-2 text-gold">
        <Sparkles className="h-4 w-4" />
        <span className="font-heading text-lg">{master?.name ?? "师父"}{" 开示"}</span>
      </div>
      {error ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {"开示暂时无法送达，愿您保持平静之心，稍后再问。"}
        </p>
      ) : (
        <p className="whitespace-pre-wrap text-sm leading-loose text-foreground/90 md:text-base">
          {text}
          {loading && (
            <Loader2 className="ml-1 inline h-4 w-4 animate-spin text-gold align-middle" />
          )}
        </p>
      )}
    </div>
  )
}
