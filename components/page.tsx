import { Badge, IconButton } from "@mui/material"
import IconMuis from "./icon"
import { useEffect, useState } from "react"

/** tip: how to have layout correctly. do not use RootLayout of nextjs. */
export function PageLayout(props: any) {
  /** tip: how to deal with page in ultrawide monitors */
  return (
    <div>
      <NavBar />
      <div className="pt-24 flex justify-center bg-gray-100 min-h-screen">
        <div className="w-full md:px-8 px-8 max-w-7xl pt-8">
          {props.children}
        </div>
      </div>
    </div>
  )
}

function NavBar() {
  const [logoCaptionIdx, setLogoCaptionIdx] = useState(0)
  const list = [
    `Missed breakfast? We did too!`,
    `More coffee, better code.`,
    `Return to office mandate? Order and head straight to kitchen.`,
    `Software Engineer's Brunch`,
  ]
  const logoCaption = list[logoCaptionIdx]

  useEffect(() => {
    const id = setInterval(() => {
      setLogoCaptionIdx((prev) => {
        if (prev == list.length - 1) return 0
        else return prev + 1
      })
    }, 2000)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <div className=" backdrop-blur-sm fixed top-0 left-0 w-full h-24 z-50 flex px-8">
      <div className="w-[40%] h-full flex items-center">
        <div className="w-full">
          <div className="flex">
            <p className=" text-4xl border-2 border-black text-black flex justify-center font-mono">
              SWE BRUNCH
            </p>
            {/** todo: add punchline here. such as:
             * - software engineer's brunch.
             * - missed breakfast today? we did too!
             * - return-to-office mandate? order from us and head straight to kitchen.
             * - more coffee, better code
             * - find more. like npmjs.com.
             * but they only appear when the user hasn't started
             * scrolling yet. otherwise this will be distracting.
             */}
          </div>
          <div className="absolute z-10">
            <p className="text-sm">{logoCaption}</p>
          </div>
        </div>
      </div>
      <div className="w-[40%] "></div>
      <div className="w-[30%] flex justify-end items-center">
        <IconButton className="mr-4">
          <IconMuis className="" iconName="dark_mode" />
        </IconButton>

        <IconButton>
          <Badge badgeContent={1} color="warning">
            <IconMuis iconName="local_mall" />
          </Badge>
        </IconButton>
      </div>
    </div>
  )
}
