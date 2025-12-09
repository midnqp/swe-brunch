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
import clsx from "clsx"
import { getSession } from "@/utils/auth"

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  //const session = await getSession()
  //console.log('gotten session', session)

  return (
    <html lang="en">
      <head>
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1" /> */}
      </head>
      <body
        className={clsx(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          false && muisFillFont.variable,
        )}
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
