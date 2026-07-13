import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site-config';
import { MetaPixel } from '@/components/analytics/meta-pixel';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { ThemeScript } from '@/components/theme/theme-script';
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://courses.biopc.org';
const title = `${siteConfig.courseName} — ${siteConfig.org} Live Course`;
const description = `${siteConfig.courseSubtitle}. ${siteConfig.courseShort} Live online, beginner-friendly, with certificate. Register now.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'R programming for biologists',
    'R for biology',
    'bioinformatics course',
    'data analysis in R',
    'ggplot2',
    'RStudio course',
    'biostatistics',
    'BioPC',
    'R programming course Bangladesh',
    'learn R online',
  ],
  authors: [{ name: siteConfig.org, url: siteConfig.social.website }],
  creator: siteConfig.org,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: `${siteConfig.org} Academy`,
    title,
    description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#080b1a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <MetaPixel />
        <GoogleAnalytics />
         {children}
      </body>
    </html>
  );
}
