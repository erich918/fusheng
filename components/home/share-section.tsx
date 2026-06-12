import { MessageCircle, Send, Share2 } from 'lucide-react'

export function ShareSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <span className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-primary/30 text-primary">
        <Share2 className="size-7" />
      </span>
      <p className="text-sm tracking-widest text-muted-foreground">一灯传万灯</p>
      <h2 className="mt-3 font-heading text-3xl text-primary md:text-4xl">
        分享传播 · 功德倍增
      </h2>
      <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        发给亲朋好友，让他们也能为家人点一盏灯、求一支签。微信、朋友圈、抖音私信都可以分享。
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        {[
          { icon: MessageCircle, label: '微信' },
          { icon: Share2, label: '朋友圈' },
          { icon: Send, label: '抖音' },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-6 py-4 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <s.icon className="size-6" />
            <span className="text-xs">{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
