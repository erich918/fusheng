import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { OracleForm } from "@/components/oracle/oracle-form"

export const metadata: Metadata = {
  title: "手相图解 · 细看掌纹 | 菩提苑",
  description: "掌纹之中藏命数，三大主线，细看人生走向。",
}

export default function PalmistryPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="手相图解"
            title="细看掌纹"
            description="生命线、智慧线、感情线，三大主线藏命数。描述你的掌纹特征，师父为你细说人生走向。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <OracleForm
            type="palmistry"
            submitLabel="请师父看相"
            fields={[
              {
                kind: "textarea",
                name: "description",
                label: "掌纹描述",
                placeholder: "如：生命线深长清晰、智慧线微微下垂、感情线分叉…可尽量详述。",
              },
            ]}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
