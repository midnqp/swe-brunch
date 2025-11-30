"use client"
import IconMuis from "@/components/IconMuis"
import { PageLayout } from "@/components/PageLayout"
import useCartItems from "@/hooks/useCartItems"
import { useGlobalState } from "@/stores/useGlobalState"
import { IconButton, useMediaQuery, useTheme } from "@mui/material"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function BrowsePage() {
  const food = {
    id: 1,
    name: "Item 1",
    price: 100,
    image: "/food.jpg",
    description:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  }
  const items = [
    food,
    { ...food, id: 2, name: "Item 2", price: 49.99 },
    { ...food, id: 3, name: "Item 3", price: 149.99 },
  ]

  const cartItems = useCartItems()
  const globalStateCartItemsCount = useGlobalState((s) => s.cartItemsCount)
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const shouldShowViewCartBar = isMobile && globalStateCartItemsCount > 0
  const setCartModalOpen = useGlobalState((state) => state.setCartModalOpen)
  const addToCart = cartItems.add

  useEffect(() => {
    console.log("BrowsePage :: cartItems changed")
  }, [cartItems])

  return (
    <PageLayout>
      <h1 className="mb-8 text-4xl">Browse</h1>

      {shouldShowViewCartBar && (
        <MobileViewCartBar
          totalLabel="Tk 200"
          onClick={() => {
            setCartModalOpen(true)
          }}
        />
      )}

      {/** tip: ideal layout for item menus */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item, idx) => (
          <Card key={idx} {...{ cartItems, addToCart, item }} />
        ))}
      </div>

      {shouldShowViewCartBar && <MobileViewCartBarOffset />}
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

  const onAddClick = (id: any) => {
    props.addToCart(id)
    //setIsAdded(true)
  }
  const onFavoriteClick = (id: any) => {
    // todo: handle
    setFavorited((prev) => !prev)
  }

  const shouldShowItemQty = isAdded && !hover

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4">
      <div style={{}} className="relative">
        <IconButton
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => onAddClick(item.id)}
          className={clsx(
            "absolute! top-0 right-0 z-10 h-8 w-8 rounded-full",
            shouldShowItemQty ? "bg-black!" : "bg-gray-300!",
          )}
        >
          {shouldShowItemQty ? (
            <span className="text-base! text-white!">
              {ci.quantity}
            </span> 
          ): <IconMuis className="text-white!" iconName={"add"} />}
        </IconButton>
        <IconButton
          onClick={() => onFavoriteClick(item.id)}
          className="absolute! top-0 right-0 z-10 mr-10! h-8 w-8 rounded-full bg-gray-300!"
        >
          <IconMuis
            className={clsx({
              "muis-icon-filled text-white!": isFavorited,
              "text-white!": !isFavorited,
            })}
            iconName="favorite"
          />
        </IconButton>
      </div>
      {/** tip: how to work with next's image compo. */}
      <div className="relative h-48 w-full">
        <Image fill className="object-contain" alt="" src={item.image} />
      </div>
      <div>
        <p className="font-bold">{item.name}</p>
        <p>${item.price}</p>
        <p>{item.description}</p>
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
