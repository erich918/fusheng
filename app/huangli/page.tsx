import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { HuangliClient } from "@/components/huangli/huangli-client"

export const metadata: Metadata = {
  title: "今日黄历 · 择吉而行 | 菩提苑",
  description: "宜忌吉凶，时辰方位，循古法择吉而行。",
}

export default function HuangliPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="每日打卡"
            title="今日黄历"
            description="干支宜忌、神煞冲煞、十二时辰，传统择吉一目了然。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <HuangliClient />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
