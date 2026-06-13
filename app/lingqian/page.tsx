import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { LotteryClient } from "@/components/oracle/lottery-client"

export const metadata: Metadata = {
  title: "求灵签 · 心诚则灵 | 菩提苑",
  description: "诚心求一支关帝灵签，听师父解签开示，指点迷津。",
}

export default function LotteryPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="传统签谱 · 关帝灵签"
            title="关帝灵签"
            description="心诚则灵 · 默念所求 · 抽一支签。100 支签文出自传统签谱，一签一事。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <LotteryClient />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
