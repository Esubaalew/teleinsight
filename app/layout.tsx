import "./globals.css"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "TeleInsight - Powerful Telegram Chat Analyzer",
  description:
    "Gain valuable insights from your Telegram chats with TeleInsight. Analyze message patterns, user engagement, and more.",
  keywords: "Telegram, chat analysis, message patterns, user engagement, data visualization",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://telegram.esube.com.et",
    site_name: "TeleInsight",
    images: [
      {
        url: "https://telegram.esube.com.et/og-image.jpg",
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
}

export default function RootLayout({ children }) {
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
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

