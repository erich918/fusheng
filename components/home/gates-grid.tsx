import Link from 'next/link'
import { GATES } from '@/lib/site-data'

export function GatesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-4xl text-primary md:text-5xl">
          九大善门
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          真排盘 · 古籍为据 · 师父开示
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GATES.map((gate) => (
          <Link
            key={gate.slug}
            href={gate.href}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 transition-all hover:border-primary/50 hover:bg-card"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-primary/30 bg-secondary text-primary transition-colors group-hover:bg-primary/10">
              <gate.icon className="size-6" />
            </span>
            <h3 className="font-heading text-2xl text-card-foreground">
              {gate.title}
            </h3>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {gate.desc}
            </p>
            <span className="mt-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
              进入 →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
