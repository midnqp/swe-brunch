import type { Metadata } from "next"
import {
  Geist,
  Geist_Mono,
  //Poppins as Geist,
  //Montserrat as Geist ,
  //Fredoka as Geist,
} from "next/font/google"
import "./globals.css"
import localFont from "next/font/local"
import { RunOnce } from "./_runOnce"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SWE Brunch — Software Engineer's Brunch",
  description: "",
}

/**
 * note: i should have use react-icons the library.
 * that is a comprehensive and complete library.
 *
 * but, i at least learned something :)
 *
 * the lesson is, always search for an existing library
 * before starting anything!
 */
export const muisFillFont = localFont({
  src: "../public/muis.woff2",
  variable: "--font-muis-filled",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${muisFillFont.variable} antialiased`}
        /**
         * note: this is the difference between fontName.variable and fontName.className.
         *
         * using .className immediately sets the text's font.
         *
         * using .variable only creates a css variable 'font-geist-sans'
         * but does not set that font for the texts automatically. (but, on my
         * phone it was automatically set. how? idk. 🤷🤷🤷)
         */
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        <RunOnce />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
