import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SWE Brunch",
  description: "Software Engineer's Brunch",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
        /**
         * note: this is the difference between fontName.variable and fontName.className.
         * 
         * using .className immediately sets the text's font.
         * 
         * using .variable only creates a css variable 'font-geist-sans'
         * but does not set that font for the texts automatically. (but, on my
         * phone it was automatically set. how? idk. 🤷🤷🤷)
         */
        style={{fontFamily: 'var(--font-geist-sans)'}}
      >
        {children}
      </body>
    </html>
  )
}
