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
            kicker="八字精批"
            title="排盘批命"
            description="以《渊海子平》为据，依你的生辰八字推演命理，点明当下运势、性格特点与近期吉凶。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <OracleForm
            type="bazi"
            submitLabel="请师父批命"
            fields={[
              { kind: "text", name: "year", label: "出生年份", placeholder: "如：1995" },
              { kind: "text", name: "month", label: "出生月份", placeholder: "如：8" },
              { kind: "text", name: "day", label: "出生日期", placeholder: "如：15" },
              { kind: "text", name: "hour", label: "出生时辰", placeholder: "如：午时 / 12", optional: true },
              {
                kind: "select",
                name: "gender",
                label: "性别",
                options: [
                  { value: "male", label: "男命" },
                  { value: "female", label: "女命" },
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
