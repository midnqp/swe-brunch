import { Badge, IconButton, useMediaQuery, useTheme } from "@mui/material"
import IconMuis from "./IconMuis"
import { useEffect, useState } from "react"
import { useGlobalState } from "@/stores/useGlobalState"
import { Logo, NavBar } from "./NavBar"
import Image from "next/image"
import clsx from "clsx"

/** tip: how to have layout correctly. do not use RootLayout of nextjs. */
export function PageLayout(props: any) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const cartItemsCount = useGlobalState((s) => s.cartItemsCount)
  const hasItems = cartItemsCount > 0

  /** tip: how to deal with page in ultrawide monitors */
  return (
    <div>
      <NavBar />
      {/* pt-24 for the navbar. */}
      <div className="flex min-h-screen justify-center bg-gray-100 pt-24">
        <div className="w-full max-w-7xl px-4 pt-8 md:px-8">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

function Footer() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const cartItemsCount = useGlobalState((s) => s.cartItemsCount)
  const hasItems = cartItemsCount > 0

  const companyLinks = [
    {
      label: "About the developer",
      href: "https://linkedin.com/in/midnqp?utm_source=swe-brunch.vercel.app",
    },
    {
      label: "How the project started",
      href: "https://www.linkedin.com/posts/midnqp_i-need-to-build-a-production-ready-portfolio-activity-7398714080712298496-qAOq?utm_source=share&utm_medium=member_desktop&rcm=ACoAACp8hQUBNVtepCwxyznGujVII_Dmcj4rfhk",
    },
    /*{
      label: "Source Code on GitHub",
      href: "https://github.com/midnqp/swe-brunch",
    }, 
    {
      label: "Frontend architecture notes (coming soon)",
      href: "",
    },
    {
      label: "Backend architecture notes (coming soon)",
      href: "",
    }, */
    {
      label: "Recent changes",
      href: "https://github.com/midnqp/swe-brunch/blob/production/CHANGELOG.md",
    },
    {
      label: "Project architecture (coming soon)",
      href: "",
    },
  ]
  const supportLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Help", href: "/help" },
  ]

  return (
    <footer
      className={clsx(
        "w-full bg-gray-100 pt-32",
        isMobile && hasItems ? "pb-20" : "",
      )}
    >
      <div className="flex justify-center">
        <div className="w-full max-w-7xl px-4 py-12 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Logo captions={false} />
              <p className="text-sm text-gray-500">
                No more worries on the missed breakfasts.
              </p>
              <p className="mt-4 text-xs text-gray-400">
                © {new Date().getFullYear()} Muhammad Bin Zafar
              </p>
            </div>

            <nav className="space-y-2">
              {/* <h4 className="text-sm font-bold text-gray-700">Project</h4> */}
              <ul className="space-y-2 text-sm text-gray-500">
                {companyLinks.map((link, i) => (
                  <li key={i}>
                    <a target="_blank" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/*<nav aria-label="Support" className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600">Support</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  {supportLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
