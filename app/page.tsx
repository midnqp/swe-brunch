"use client"
import IconMuis from "@/components/IconMuis"
import { PageLayout } from "@/components/PageLayout"
import useCartItems from "@/hooks/useCartItems"
import { useGlobalState } from "@/stores/useGlobalState"
import backendApis from "@/utils/apis"
import { IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { handleSignIn } from "@/utils/auth"

export default function Page() {
  return (
    <SessionProvider>
      <_BrowsePage />
    </SessionProvider>
  )
}

function _BrowsePage() {
  const engineersProducts = backendApis.listEngineersItems()
  const mangersProducts = backendApis.listProductManagersItems()
  const cartItems = useCartItems()
  const globalStateCartItemsCount = useGlobalState((s) => s.cartItemsCount)
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const shouldShowViewCartBar = isMobile && globalStateCartItemsCount > 0
  const setCartModalOpen = useGlobalState((state) => state.setCartModalOpen)
  const addToCart = (id: any) => {
    if (!isMobile && cartItems.list.length === 0) setCartModalOpen(true)
    cartItems.add(id)
  }

  const s = useSession()
  useEffect(() => {
    //console.log('session', s)
  }, [s])

  const menus = [
    {
      name: "Software Engineer's Brunch",
      description:
        "For those who write code. Meals optimized for protein and sustained anchoring in the desk.",
      products: engineersProducts,
    },
    {
      name: "Product Manager's Brunch",
      description: `'High-impact' and 'customer-centric' cuisines. If your team has delivered before deadline, treat them with an 1:6.`,
      products: mangersProducts,
      id: "pms-brunch",
    },
    {
      name: "Founder's Brunch",
      description:
        "Wide variety of choices. Pick yours based on your remaining runway.",
      products: backendApis.listFoundersItems(),
      id: "founders-brunch",
    },
  ]

  return (
    <PageLayout>
      <h1 className="mt-8 text-4xl">Browse Your Taste</h1>

      {menus.map((m, idx) => (
        <div key={idx} className="mt-24">
          <div className="mb-8">
            <h2 className="text-gray-600" id={m?.id}>
              {m.name}
            </h2>
            <div className="text-sm text-gray-400"> {m.description} </div>
          </div>
          <div
            className={clsx(
              "mb-4 grid grid-cols-1 gap-4 md:grid-cols-4",
              false && "justify-items-center",
            )}
          >
            {m.products.map((item, idx) => (
              <Card key={idx} {...{ cartItems, addToCart, item }} />
            ))}
          </div>{" "}
        </div>
      ))}

      {shouldShowViewCartBar && (
        <MobileViewCartBar
          totalLabel="Tk 200"
          onClick={() => {
            setCartModalOpen(true)
          }}
        />
      )}
    </PageLayout>
  )
}

function MobileViewCartBarOffset() {
  /** h-20 is equal to the length of ViewCartBar.  */
  return <div className="h-20"></div>
}

function Card(props: any) {
  console.log("Card :: rendering")
  const item: any = props.item
  //const [isAdded, setIsAdded] = useState(false)
  const ci = props.cartItems.list.find((i: any) => i.id === item.id)
  const isAdded = !!ci
  const [hover, setHover] = useState(false)
  const [isFavorited, setFavorited] = useState(false)
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))

  const onAddClick = (id: any) => {
    props.addToCart(id)
    /*if (isMobile) {
      setHover(true)
      setTimeout(() => {
        setHover(false)
      }, 1000)
    } */
  }
  const onFavoriteClick = (id: any) => {
    const favoritedItems = JSON.parse(
      window.localStorage.getItem("favoritedItems") || "[]",
    )
    if (isFavorited) {
      favoritedItems.splice(favoritedItems.indexOf(id), 1)
    } else {
      favoritedItems.push(id)
    }
    window.localStorage.setItem(
      "favoritedItems",
      JSON.stringify(favoritedItems),
    )
    setFavorited((prev) => !prev)
  }

  const shouldShowItemQty = isAdded && !hover

  useEffect(() => {
    const favoritedItems = JSON.parse(
      window.localStorage.getItem("favoritedItems") || "[]",
    )
    setFavorited(favoritedItems.includes(item.id))
  }, [])

  return (
    <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
      <div style={{}} className="relative">
        <div className="absolute! top-0 right-0 z-10 flex gap-2 p-4 md:pt-2 md:pr-2">
          <Tooltip arrow title={isFavorited ? "Unsave" : "Save for later"}>
            <IconButton
              onClick={() => onFavoriteClick(item.id)}
              className="h-10 w-10 rounded-full bg-gray-300! md:h-8 md:w-8"
            >
              <IconMuis
                className={clsx("", {
                  "muis-icon-filled text-red-600!": isFavorited,
                  "text-white!": !isFavorited,
                })}
                iconName="favorite"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eat right now!" arrow>
            <IconButton
              // note: using onMouseEnter fails miserably on mobile.
              onPointerEnter={() => setHover(true)}
              onPointerLeave={() => setHover(false)}
              onClick={() => onAddClick(item.id)}
              className={clsx(
                "h-10 w-10 rounded-full shadow-2xl! md:h-8 md:w-8",
                shouldShowItemQty ? "bg-black!" : "bg-gray-300!",
              )}
            >
              {shouldShowItemQty ? (
                <p className="text-base! text-white!">{ci.quantity}</p>
              ) : (
                <IconMuis className="text-white!" iconName={"add"} />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {/** tip: how to work with next's image compo. */}
      <div className="relative aspect-[4/3] w-full!">
        <Image
          draggable={false}
          fill
          className="object-cover"
          alt=""
          src={item.image}
        />
      </div>
      <div className="p-4">
        <p className="font-bold">{item.name}</p>
        <p className="mb-2">Tk {item.price}</p>
        <p className="text-sm leading-tight text-gray-500">
          {item.description}
        </p>
      </div>
    </div>
  )
}

type MobileViewCartBarProps = {
  totalLabel: string
  onClick: () => void
}

function MobileViewCartBar({ totalLabel, onClick }: MobileViewCartBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 z-50 block h-20 w-full cursor-pointer bg-black md:hidden"
      onClick={onClick}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full text-white [&>div]:flex [&>div]:justify-center">
          <div className="w-[20%]">
            <IconMuis iconName="local_mall" />
          </div>
          <div className="h-full w-[60%]">View Cart</div>
          <div className="w-[20%]">{totalLabel}</div>
        </div>
      </div>
    </div>
  )
}
