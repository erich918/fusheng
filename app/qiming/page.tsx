import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { OracleForm } from "@/components/oracle/oracle-form"
import { NAMING_HIGHLIGHTS, NAMING_STYLES } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "宝宝起名 · 取吉祥好名 | 菩提苑",
  description: "结合八字喜忌、音韵笔画、典故诗词，给孩子一个耐看的名字。",
}

export default function NamingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="incense-glow border-b border-border px-4 py-16 md:py-20">
          <PageHeader
            kicker="传家 · 宝宝起名"
            title="宝宝起名"
            description="名字伴随孩子一生 — 影响性情、姻缘、事业、贵人。一个好名字，是父母给孩子最早的福报。"
          />
        </section>
        <section className="px-4 pb-2">
          <ul className="mx-auto grid max-w-2xl gap-2 sm:grid-cols-2">
            {NAMING_HIGHLIGHTS.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-xl border border-border bg-card/40 px-4 py-3 text-sm text-muted-foreground"
              >
                <span className="text-gold">{"✦"}</span>
                <span className="text-pretty">{h}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="px-4 py-12 md:py-16">
          <OracleForm
            type="naming"
            submitLabel="请师父起名"
            fields={[
              { kind: "birth", name: "birth", label: "生辰" },
              {
                kind: "select",
                name: "gender",
                label: "性别",
                options: [
                  { value: "boy", label: "男" },
                  { value: "girl", label: "女" },
                ],
              },
              { kind: "text", name: "surname", label: "姓氏", placeholder: "如：李" },
              {
                kind: "select",
                name: "length",
                label: "姓名总字数（含姓）",
                options: [
                  { value: "2", label: "2 字（如 李安）" },
                  { value: "3", label: "3 字（如 李思远）" },
                ],
              },
              {
                kind: "select",
                name: "style",
                label: "偏好风格",
                options: NAMING_STYLES.map((s) => ({ value: s, label: s })),
              },
            ]}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
