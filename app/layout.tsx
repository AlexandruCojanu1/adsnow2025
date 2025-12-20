import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import "bootstrap/dist/css/bootstrap.min.css"
import "../src/assets/css/main.css"
import "../src/assets/css/responsive.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "animate.css"

// Optimize Google Fonts with next/font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--global-font',
})

// Global Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://adsnow.ro'),
  title: {
    template: '%s | ADSNOW - Your Online Identity Advisor',
    default: 'Consultanță în Identitate Digitală și Marketing Online | Your Online Identity Advisor',
  },
  description: 'Construim identități digitale pentru profesioniști și branduri care aduc valoare. Nu vindem servicii. Alegem parteneri.',
  keywords: ['marketing digital', 'identitate digitală', 'branding', 'SEO', 'social media', 'web design', 'Brașov', 'performance marketing', 'brand strategy'],
  authors: [{ name: 'Algo Digital Solutions' }],
  creator: 'Algo Digital Solutions',
  publisher: 'Algo Digital Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://adsnow.ro',
    siteName: 'ADSNOW',
    title: 'Consultanță în Identitate Digitală și Marketing Online | Your Online Identity Advisor',
    description: 'Construim identități digitale pentru profesioniști și branduri care aduc valoare. Nu vindem servicii. Alegem parteneri.',
    images: [
      {
        url: '/assets/images/logo1.png',
        width: 1200,
        height: 630,
        alt: 'ADSNOW - Your Online Identity Advisor',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Consultanță în Identitate Digitală și Marketing Online',
    description: 'Construim identități digitale pentru profesioniști și branduri care aduc valoare.',
    images: ['/assets/images/logo1.png'],
  },
  
  // Additional Meta Tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
  },
  
  // Language
  alternates: {
    canonical: 'https://adsnow.ro',
    languages: {
      'ro-RO': 'https://adsnow.ro',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={inter.variable}>
      <head>
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        
        {/* Font Awesome CSS - Required for check-list icons */}
        <link rel="stylesheet" href="/assets/css/vendor/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/solid.css" />
        <link rel="stylesheet" href="/assets/css/vendor/regular.css" />
        <link rel="stylesheet" href="/assets/css/vendor/brands.css" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/assets/images/logo1.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0D2440" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        
        {/* Bootstrap JS */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
        
        {/* Font Awesome JS removed - using CSS fonts only for better performance */}
      </body>
    </html>
  )
}

