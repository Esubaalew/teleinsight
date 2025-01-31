import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import React, { ReactNode } from 'react';
import Manygils from '../components/manygils';


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
  author:"Esubalew Chekol",
  published: "2025-01-31",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://telegram.esube.com.et",
    site_name: "TeleInsight",
    images: [
      {
        url: "https://telegram.esube.com.et/og-image.png",
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
        <link rel="canonical" href="https://telegram.esube.com.et" />
      </head>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Manygils />
            <SpeedInsights />
            <Analytics />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}