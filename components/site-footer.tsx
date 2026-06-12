import { BodhiLeaf } from '@/components/bodhi-leaf'
import { ZEN_QUOTES } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="incense-glow">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-16 text-center">
          {ZEN_QUOTES.map((q) => (
            <p
              key={q}
              className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              {q}
            </p>
          ))}
          <div className="mt-8 flex items-center gap-2 text-primary">
            <BodhiLeaf className="size-5" />
            <span className="font-heading text-lg">菩提苑</span>
            <span className="text-sm text-muted-foreground">
              · 一念慈悲，一灯长明
            </span>
          </div>
          <p className="text-xs text-muted-foreground/70">
            本站不替代医疗、法律、投资建议。一切结果，仅作传统文化参考。
          </p>
        </div>
      </div>
    </footer>
  )
}
