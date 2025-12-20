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
import { OrganizationSchema, WebsiteSchema, ServiceSchema } from '@/components/seo/StructuredData'

// Page-specific metadata (merges with root layout)
export const metadata: Metadata = {
  title: 'Consultanță în Identitate Digitală și Marketing Online',
  description: 'Construim identități digitale pentru profesioniști și branduri care aduc valoare. Nu vindem servicii. Alegem parteneri.',
  openGraph: {
    title: 'Consultanță în Identitate Digitală și Marketing Online | Your Online Identity Advisor',
    description: 'Construim identități digitale pentru profesioniști și branduri care aduc valoare. Nu vindem servicii. Alegem parteneri.',
    url: 'https://adsnow.ro',
    images: ['/assets/images/logo1.png'],
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
        <NewsletterSection />
        <BlogSection />
      </main>
    </>
  )
}

