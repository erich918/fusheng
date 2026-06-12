import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { OracleForm } from "@/components/oracle/oracle-form"

export const metadata: Metadata = {
  title: "六爻占卜 · 一事一卦 | 菩提苑",
  description: "一事一卦，以铜钱起卦，师父解卦指迷津。",
}

export default function DivinationPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="六爻占卜"
            title="一事一卦"
            description="心诚意正，一事一问。写下所占之事与卦象，师父依《周易》为你解卦指迷津。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <OracleForm
            type="divination"
            submitLabel="请师父解卦"
            fields={[
              {
                kind: "textarea",
                name: "question",
                label: "所占之事",
                placeholder: "如：此次合作能否顺利达成？",
              },
              {
                kind: "text",
                name: "hexagram",
                label: "卦象",
                placeholder: "如：水火既济 / 不知卦象可留空，由师父代为起卦",
                optional: true,
              },
            ]}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
