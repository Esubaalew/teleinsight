import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import React, { ReactNode } from "react";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "TeleInsight - Powerful Telegram Chat Analyzer",
  description:
    "Gain valuable insights from your Telegram chats with TeleInsight. Analyze message patterns, user engagement, and more.",
  keywords: "Telegram, chat analysis, message patterns, user engagement, data visualization",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://telegram.esubalew.et", // Preferred URL
    site_name: "TeleInsight",
    images: [
      {
        url: "https://telegram.esubalew.et/og-image.png",
        width: 1200,
        height: 630,
        alt: "TeleInsight - Powerful Telegram Chat Analyzer",
      },
    ],
  },
  twitter: {
    handle: "@esubaalew",
    site: "@teleinsight",
    cardType: "summary_large_image",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://telegram.esubalew.et" />
        {/* Alternate URL (if desired) */}
        <link rel="alternate" href="https://telegram.esube.tech" hreflang="en" />

        <meta name="author" content="Esubalew Chekol" />
        <meta name="publication-date" content="2025-01-31" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TeleInsight - Powerful Telegram Chat Analyzer",
              url: "https://telegram.esubalew.et",
              description:
                "Gain valuable insights from your Telegram chats with TeleInsight. Analyze message patterns, user engagement, and more.",
              author: {
                "@type": "Person",
                name: "Esubalew Chekol",
              },
              datePublished: "2025-01-31",
              publisher: {
                "@type": "Organization",
                name: "TeleInsight",
                logo: {
                  "@type": "ImageObject",
                  url: "https://telegram.esubalew.et/favicon.ico",
                  width: 600,
                  height: 60,
                },
              },
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <SpeedInsights />
            <Analytics />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
