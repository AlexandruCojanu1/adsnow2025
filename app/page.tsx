import { Metadata } from 'next'
import Banner from '@/components/sections/Banner'
import ExpertiseSection from '@/components/sections/ExpertiseSection'
import ChooseUsSection from '@/components/sections/ChooseUsSection'
import GuideBannerSection from '@/components/sections/GuideBannerSection'
import ServiceSection from '@/components/sections/ServiceSection'
import DigitalProcessSection from '@/components/sections/DigitalProcessSection'
import PricingSection from '@/components/sections/PricingSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import BlogSection from '@/components/sections/BlogSection'
import FAQSection from '@/components/sections/FAQSection'
import { OrganizationSchema, WebsiteSchema, ServiceSchema } from '@/components/seo/StructuredData'

// Page-specific metadata (merges with root layout)
export const metadata: Metadata = {
  title: 'ADS Now Brașov - Agenție Marketing Digital',
  description: 'Agenție boutique de strategie digitală și marketing online. Construim identități digitale pentru profesioniști și branduri care aduc valoare.',
  openGraph: {
    title: 'ADS Now Brașov - Agenție Marketing Digital',
    description: 'Agenție boutique de strategie digitală și marketing online. Construim identități digitale pentru profesioniști și branduri care aduc valoare.',
    url: 'https://adsnow.ro',
    images: ['/opengraph-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <WebsiteSchema />
      <ServiceSchema />
      
      {/* Main Content */}
      <main>
        <Banner />
        <ExpertiseSection />
        <ChooseUsSection />
        <GuideBannerSection />
        <ServiceSection />
        <DigitalProcessSection />
        <PricingSection />
        <FAQSection />
        <NewsletterSection />
        <BlogSection />
      </main>
    </>
  )
}

