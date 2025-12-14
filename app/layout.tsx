import { NextAuthSessionProvider } from "@/components/SessionProvider"
import { InitColorSchemeScript } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Analytics } from "@vercel/analytics/next"
import clsx from "clsx"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import { RunOnce } from "./_runOnce"
import "./globals.css"
import { MuiThemeProvider } from "@/components/ThemeProvider"
import { cookies } from "next/headers"

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
  const c = await cookies()
  const userTheme = c.get("userTheme")?.value
  const defaultTheme = userTheme || ("system" as const)
  console.log("server :: defaulttheme", defaultTheme)

  return (
    // note: am i not suppressing something huge?
    // no, i'm only suppressing the newly added "class=dark" to this html element.
    <html lang="en" suppressHydrationWarning>
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
        {/* note: let's forget about cross-tab theme.
        i just want the system theme to be set initially.
        and let the user override the system theme.
        and let the page load with the correct theme from the get-go.


        and wow, this <InitColorSchemeScript /> does exactly that accurate thing.
        it adds `class='dark'` to root element for the server-generated DOM that is 
        shown to the user before hydration. another GOAT.
         */}
        <InitColorSchemeScript
          attribute="class"
          defaultMode={defaultTheme as any}
        />
        <MuiThemeProvider defaultTheme={defaultTheme}>
          {/* <CssBaseline /> */}
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </MuiThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
