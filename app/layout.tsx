import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_Arabic, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LocaleProvider } from "@/contexts/locale-context"
import { Toaster } from "@/components/ui/toaster" // ⬅️ إضافة الـ Toaster
import "./globals.css"

// <CHANGE> Using Noto Sans Arabic for better Arabic support
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  display: "swap",
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "حاوية - منصة الجملة",
  description: "منصة لربط الموردين بعملاء الجملة.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoSansArabic.className} font-sans antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
        <Toaster /> {/* هنا تُعرض كل التوستات من useToast() */}
      </body>
    </html>
  )
}
