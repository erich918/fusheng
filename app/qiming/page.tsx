import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { OracleForm } from "@/components/oracle/oracle-form"

export const metadata: Metadata = {
  title: "宝宝起名 · 取吉祥好名 | 菩提苑",
  description: "依五行八字，取吉祥好名，寓意深远绵长。",
}

export default function NamingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="宝宝起名"
            title="取吉祥好名"
            description="名以载道，字以寄愿。告知姓氏与期望，师父为宝宝赐三个寓意深远的吉祥好名。"
          />
        </section>
        <section className="px-4 py-12 md:py-16">
          <OracleForm
            type="naming"
            submitLabel="请师父赐名"
            fields={[
              { kind: "text", name: "surname", label: "宝宝姓氏", placeholder: "如：李" },
              {
                kind: "select",
                name: "gender",
                label: "宝宝性别",
                options: [
                  { value: "boy", label: "男宝宝" },
                  { value: "girl", label: "女宝宝" },
                ],
              },
              {
                kind: "textarea",
                name: "wishes",
                label: "期望寓意",
                placeholder: "如：希望孩子平安健康、聪慧有志…",
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
