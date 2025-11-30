import { Badge, IconButton } from "@mui/material"
import IconMuis from "./IconMuis"
import { useEffect, useState } from "react"
import { useGlobalState } from "@/stores/useGlobalState"
import { NavBar } from "./NavBar"

/** tip: how to have layout correctly. do not use RootLayout of nextjs. */
export function PageLayout(props: any) {
  /** tip: how to deal with page in ultrawide monitors */
  return (
    <div>
      <NavBar />
      <div className="flex min-h-screen justify-center bg-gray-100 pt-24">
        <div className="w-full max-w-7xl px-4 pt-8 md:px-8">
          {props.children}
        </div>
      </div>
    </div>
  )
}
