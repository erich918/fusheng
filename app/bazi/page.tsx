import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { OracleForm } from "@/components/oracle/oracle-form"

export const metadata: Metadata = {
  title: "八字精批 · 排盘批命 | 菩提苑",
  description: "以《渊海子平》为据，依生辰八字排盘批命，点明运势与性格。",
}

export default function BaziPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="传家技艺"
            title="八字精批"
            description="输入生辰，洞悉天命，先看命盘，再看流年。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <OracleForm
            type="bazi"
            submitLabel="请师父排盘"
            fields={[
              { kind: "birth", name: "birth", label: "生辰" },
              {
                kind: "select",
                name: "gender",
                label: "性别",
                options: [
                  { value: "male", label: "男" },
                  { value: "female", label: "女" },
                ],
              },
            ]}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
