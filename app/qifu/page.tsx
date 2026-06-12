import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { PrayerWall } from "@/components/prayer/prayer-wall"

export const metadata: Metadata = {
  title: "为家人祈福 · 点一盏心灯 | 菩提苑",
  description: "为家人点一盏心灯，挂家人之名，愿心愿成就，福寿安康。",
}

export default function PrayerPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="为家人祈福"
            title="点一盏心灯"
            description="挂家人之名，许一份心愿。一念慈悲，一灯长明，愿所念之人皆得安康顺遂。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <PrayerWall />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
