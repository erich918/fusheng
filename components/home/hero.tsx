import Link from 'next/link'
import { Heart, ScrollText } from 'lucide-react'
import { BodhiLeaf } from '@/components/bodhi-leaf'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="incense-glow absolute inset-0" aria-hidden="true" />
      {/* 飘动的香火光点 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[15, 38, 62, 84].map((left, i) => (
          <span
            key={left}
            className="animate-float-up absolute bottom-24 size-1 rounded-full bg-primary/60"
            style={{ left: `${left}%`, animationDelay: `${i * 1.1}s` }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center md:py-32">
        <span className="mb-8 flex size-20 items-center justify-center rounded-full border border-primary/40 bg-card/60 text-primary shadow-[0_0_40px_-8px_var(--gold)]">
          <BodhiLeaf className="size-9" />
        </span>

        <h1 className="font-heading text-6xl text-primary text-glow-gold md:text-8xl">
          菩提苑
        </h1>

        <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          以古籍为根，以师父为引
          <br />
          为家人祈福 · 求灵签 · 看八字
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/qifu"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-accent-foreground shadow-lg transition-transform hover:scale-105"
          >
            <Heart className="size-5" />
            为家人祈福
          </Link>
          <Link
            href="/lingqian"
            className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-8 py-3.5 text-base text-primary transition-colors hover:bg-primary/10"
          >
            <ScrollText className="size-5" />
            求一支灵签
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted-foreground/70">
          向下滚动 · 看更多功德
        </p>
      </div>
    </section>
  )
}
