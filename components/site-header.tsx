'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Music, Download, User, Menu, X, Share2 } from 'lucide-react'
import { BodhiLeaf } from '@/components/bodhi-leaf'
import { GATES } from '@/lib/site-data'

const NAV_LINKS = [
  { title: '为家人祈福', href: '/qifu' },
  { title: '今日黄历', href: '/huangli' },
  { title: '求灵签', href: '/lingqian' },
  { title: '八字精批', href: '/bazi' },
  { title: '周公解梦', href: '/jiemeng' },
  { title: '看手相', href: '/shouxiang' },
  { title: '宝宝起名', href: '/qiming' },
  { title: '六爻占卜', href: '/liuyao' },
  { title: '静心禅坐', href: '/chanzuo' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 text-primary">
            <BodhiLeaf className="size-5" />
          </span>
          <span className="font-heading text-2xl leading-none text-primary text-glow-gold">
            菩提苑
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-primary ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.title}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="背景音乐"
            className="hidden size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-primary md:flex"
          >
            <Music className="size-4" />
          </button>
          <button
            type="button"
            aria-label="保存到桌面"
            className="hidden size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-primary md:flex"
          >
            <Download className="size-4" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/10"
          >
            <User className="size-4" />
            <span className="hidden sm:inline">清虚子192</span>
          </button>
          <button
            type="button"
            aria-label="打开菜单"
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 px-4 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {GATES.map((gate) => (
              <Link
                key={gate.href}
                href={gate.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <gate.icon className="size-4 text-primary/70" />
                {gate.title}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export function ShareButton() {
  return (
    <button
      type="button"
      aria-label="分享传播"
      className="fixed right-4 top-1/2 z-40 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-card/80 text-primary shadow-lg backdrop-blur transition-transform hover:scale-105"
    >
      <Share2 className="size-5" />
    </button>
  )
}
