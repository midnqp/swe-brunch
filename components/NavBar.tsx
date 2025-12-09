import { useGlobalState } from "@/stores/useGlobalState"
import {
  IconButton,
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  DialogActions,
  Button,
  Divider,
  Link,
} from "@mui/material"
import { useState, useEffect } from "react"
import IconMuis from "./IconMuis"
import { CartItems } from "./Cart"
import useCartItems from "@/hooks/useCartItems"
import backendApis from "@/utils/apis"
import { useRouter } from "next/navigation"
import { CartDialog } from "./CartDialog"
import { handleSignIn } from "@/utils/auth"
import { useSession } from "next-auth/react"
import Image from "next/image"

export function NavBar() {
  const cartItemsCount = useGlobalState((state) => state.cartItemsCount)
  const isCartModalOpen = useGlobalState((state) => state.isCartModalOpen)
  const setCartModalOpen = useGlobalState((state) => state.setCartModalOpen)
  const hasCartItems = !!cartItemsCount
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  /** session is undefined during the next-build process. */
  const session = useSession()
  const isLoggedIn = session?.data
  const userData = session?.data?.user

  return (
    <div className="fixed top-0 left-0 z-50 flex min-h-24 w-full px-4 py-4 backdrop-blur-sm md:min-h-24 md:px-8 md:py-2">
      <div className="flex w-[50%] items-center">
        <Logo />
      </div>
      <div className="flex w-[50%] items-center justify-end [&>*:last-child]:mr-0! [&>button]:mr-4!">
        {!isMobile && (
          <>
            <div
              className="mr-16! cursor-pointer text-gray-400"
              onClick={() => {
                document
                  .getElementById("founders-brunch")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }}
            >
              Founder's Brunch
            </div>
            <div
              className="mr-16! cursor-pointer text-gray-400"
              onClick={() => {
                document
                  .getElementById("pms-brunch")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }}
            >
              PM's Brunch
            </div>
            {/* <div className="hidden md:block mr-16! text-gray-400"><a target="_blank" href='https://github.com/midnqp/swe-brunch/tree/main/CHANGELOG.md'>Changelog</a></div> */}
          </>
        )}

        {!isMobile && (
          <IconButton className="">
            <IconMuis className="" iconName="dark_mode" />
          </IconButton>
        )}

        <IconButton
          onClick={() => {
            setCartModalOpen(true)
          }}
        >
          <Badge badgeContent={cartItemsCount} color="warning">
            <IconMuis iconName="local_mall" />
          </Badge>
        </IconButton>

        {
          <IconButton
            onClick={() => {
              if (!isLoggedIn) handleSignIn()
            }}
          >
            {isLoggedIn ? (
              <div className="relative aspect-square w-6! overflow-hidden rounded-full!">
                <Image
                  fill
                  className="object-cover"
                  src={userData.image!}
                  alt=""
                />
              </div>
            ) : (
              <IconMuis iconName="account_circle" />
            )}
          </IconButton>
        }
      </div>
      <CartDialog
        open={isCartModalOpen}
        onClose={() => setCartModalOpen(false)}
        hasCartItems={hasCartItems}
      />
    </div>
  )
}

export function Logo(props: { captions?: boolean }) {
  const [logoCaptionIdx, setLogoCaptionIdx] = useState(0)
  const list = [
    `Missed breakfast today? We did too.`,
    `More coffee, better code.`,
    `Return to office mandate? Straight to kitchen!`,
    `Software Engineer's Brunch`,
  ]
  const logoCaption = list[logoCaptionIdx]
  useEffect(() => {
    if (props.captions === false) return
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
    <div className="flex w-full">
      <div>
        <Link className="flex" underline="none" href="/">
          <p className="flex justify-center border-2 border-black p-0 font-mono text-4xl leading-none text-black">
            SWE BRUNCH
          </p>
        </Link>
        {props.captions !== false && (
          <div className="">
            <p className="hidden text-sm text-gray-400 md:block">
              {logoCaption}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
