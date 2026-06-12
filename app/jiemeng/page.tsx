import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { OracleForm } from "@/components/oracle/oracle-form"

export const metadata: Metadata = {
  title: "周公解梦 · 析梦明心 | 菩提苑",
  description: "夜来一梦，吉凶难辨，师父为你析其深意。",
}

export default function DreamPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="周公解梦"
            title="析梦明心"
            description="梦由心生，亦由境起。写下你的梦境，师父为你分析吉凶征兆与深层心理含义。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <OracleForm
            type="dream"
            submitLabel="请师父解梦"
            fields={[
              {
                kind: "textarea",
                name: "dream",
                label: "梦境描述",
                placeholder: "请尽量详细地描述你昨夜或近日的梦境…",
              },
            ]}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
