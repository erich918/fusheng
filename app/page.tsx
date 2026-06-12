import { SiteHeader, ShareButton } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { GatesGrid } from '@/components/home/gates-grid'
import { WhyUs } from '@/components/home/why-us'
import { IncenseOffering } from '@/components/home/incense-offering'
import { ShareSection } from '@/components/home/share-section'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <ShareButton />
      <main>
        <Hero />
        <GatesGrid />
        <WhyUs />
        <IncenseOffering />
        <ShareSection />
      </main>
      <SiteFooter />
    </>
  )
}
