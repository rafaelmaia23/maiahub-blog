import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Mono, JetBrains_Mono } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import { NavBar, Footer } from '@/components'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-heading',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'pt_BR',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
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
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${spaceMono.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <link rel="apple-touch-icon" href={`${basePath}/static/favicons/apple-touch-icon.png`} />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${basePath}/static/favicons/favicon-96x96.png`}
      />
      <link
        rel="icon"
        href={`${basePath}/static/favicons/favicon.svg`}
        type="image/svg+xml"
        sizes="any"
      />
      <link rel="icon" href={`${basePath}/static/favicons/favicon.ico`} />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <meta name="theme-color" content="#0a0e1a" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body
        suppressHydrationWarning
        className="bg-deep-space font-body text-text-primary flex min-h-screen flex-col pl-[calc(100vw-100%)] antialiased"
      >
        <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
        <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
          <NavBar />
          <main className="mt-16 flex-1">{children}</main>
          <Footer />
        </SearchProvider>
      </body>
    </html>
  )
}
