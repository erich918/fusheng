'use client'

import { useState } from 'react'
import { Flame } from 'lucide-react'

export function IncenseOffering() {
  const [lit, setLit] = useState([false, false, false])
  const litCount = lit.filter(Boolean).length

  function lightStick(i: number) {
    setLit((prev) => {
      const next = [...prev]
      next[i] = true
      return next
    })
  }

  function reset() {
    setLit([false, false, false])
  }

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="incense-glow absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
        <p className="text-sm tracking-widest text-muted-foreground">
          每日三礼 · 每礼三炷
        </p>
        <h2 className="mt-3 font-heading text-4xl text-primary md:text-5xl">
          在线上香
        </h2>
        <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          静心三礼九炷，为自己、为家人、为众生。心念在哪里，福报就在哪里。
        </p>

        {/* 香炉 */}
        <div className="relative mt-12 flex items-end justify-center gap-6">
          {lit.map((isLit, i) => (
            <button
              key={i}
              type="button"
              onClick={() => lightStick(i)}
              disabled={isLit}
              aria-label={`点燃第 ${i + 1} 炷香`}
              className="group flex flex-col items-center"
            >
              <span className="relative mb-1 h-8 w-1">
                {isLit && (
                  <Flame className="animate-flame absolute -top-4 left-1/2 size-5 -translate-x-1/2 text-accent" />
                )}
              </span>
              <span
                className={`h-24 w-1 rounded-full transition-colors ${
                  isLit ? 'bg-primary' : 'bg-muted-foreground/40 group-hover:bg-primary/60'
                }`}
              />
            </button>
          ))}
        </div>

        {/* 香炉底座 */}
        <div className="-mt-1 h-10 w-48 rounded-b-2xl rounded-t-md border border-primary/30 bg-secondary shadow-inner" />

        <p className="mt-6 text-sm text-muted-foreground">
          已上 <span className="text-primary">{litCount}</span> / 3 炷香
        </p>

        {litCount === 3 ? (
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full border border-primary/40 px-6 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
          >
            心愿已达 · 再上一礼
          </button>
        ) : (
          <p className="mt-4 text-xs text-muted-foreground/70">
            轻触香炷，逐一点燃
          </p>
        )}
      </div>
    </section>
  )
}
