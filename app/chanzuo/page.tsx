import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { MeditationClient } from "@/components/meditation/meditation-client"

export const metadata: Metadata = {
  title: "静心禅坐 · 调息观心 | 菩提苑",
  description: "调息观心，静坐片刻，让浮躁归于宁静。",
}

export default function MeditationPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="静心禅坐"
            title="调息观心"
            description="忙碌之中，留一段时光给自己。跟随呼吸节律，静坐片刻，让浮躁归于宁静。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <MeditationClient />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
