import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { DreamClient } from "@/components/dream/dream-client"

export const metadata: Metadata = {
  title: "周公解梦 · 析梦明心 | 菩提苑",
  description: "百梦皆有意，古今相参证。80 余条经典梦境，直接告诉您吉凶。",
}

export default function DreamPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="新增 · 周公解梦"
            title="周公解梦"
            description="百梦皆有意 · 古今相参证。写下梦境由师父开示，或按类查阅经典梦境吉凶。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <DreamClient />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
