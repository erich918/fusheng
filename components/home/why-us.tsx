import { BookOpen, Users, HeartHandshake } from 'lucide-react'
import { CLASSICS } from '@/lib/site-data'

const REASONS = [
  {
    icon: BookOpen,
    title: '古籍为根',
    desc: '解读围绕《渊海子平》《滴天髓》《周易》等经典展开，引文皆有出处。',
  },
  {
    icon: Users,
    title: '师父开示',
    desc: '三位虚拟师父分别擅长稳重派、慈悲派与直爽派，选适合您的来听。',
  },
  {
    icon: HeartHandshake,
    title: '心诚为本',
    desc: '网站不替代医疗、法律、投资建议。一切结果，仅作传统文化参考。',
  },
]

export function WhyUs() {
  return (
    <section className="border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <h2 className="mb-12 text-center font-heading text-4xl text-primary md:text-5xl">
          为何选菩提苑
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-8 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full border border-primary/30 text-primary">
                <r.icon className="size-7" />
              </span>
              <h3 className="font-heading text-2xl text-card-foreground">
                {r.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {CLASSICS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-primary/30 bg-background/60 px-4 py-1.5 text-sm text-gold-soft"
            >
              《{c}》
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
