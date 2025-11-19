"use client"
import IconMuis from "@/components/IconMuis"
import { PageLayout } from "@/components/PageLayout"
import useCartItems from "@/hooks/useCartItems"
import { Button, Divider, IconButton } from "@mui/material"
import clsx from "clsx"
import Image from "next/image"
import { useEffect } from "react"

export default function CartPage() {
  const cartItems = useCartItems()
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

  return (
    <PageLayout>
      <h1 className="mb-8 text-4xl">Your items</h1>
      <Cart {...{ cartItems, products: items }} />
    </PageLayout>
  )
}

function Cart(props: any) {
  const { cartItems, products } = props
  //const cartItems = useCartItems()
  console.log("cart: rendering")
  return (
    <div>
      {cartItems.list.map((item: any, idx: number) => (
        <>
          <CartItem {...{ item, cartItems }} />
          {idx < cartItems.list.length - 1 && (
            <div className="px-4">
              <Divider className="" />
            </div>
          )}
        </>
      ))}
    </div>
  )
}

function CartItem(props: any) {
  const { item, cartItems } = props
  //const cartItems = useCartItems()
  const onAddClick = () => cartItems.add(item.id)
  const onRemoveClick = () => cartItems.removeByQty(item.id, 1)

  console.log("cartitem: re-rendering", item.quantity)

  return (
    <div className="flex w-full py-4">
      {/** tip: the correct way to deal with images  */}
      <div className="flex h-full w-[25%]">
        <div className="relative m-4 h-16 w-16 overflow-hidden rounded-2xl! border border-gray-400">
          <Image className="object-cover" src="/food.jpg" fill alt="" />
        </div>
      </div>
      <div className="flex w-[50%] items-center">
        <div className="flex h-16 flex-col justify-between">
          <p className="w-full font-bold">Item Name</p>
          <p className="w-full text-gray-600">Tk 100</p>
        </div>
      </div>
      <div className="flex w-[25%] items-center justify-center">
        <div className="flex items-center rounded-3xl border border-gray-300 bg-gray-100 px-2 py-1">
          {/** note: all these foolishness with <Button />
           * only due to forgetting <IconButton /> 😡😡😡😡😡. */}

          {/*<div className="w-6 overflow-hidden">
            <Button
              color="inherit"
              disableRipple
              className="m-0! flex! justify-start! p-0!"
              onClick={onRemoveClick}
            > 
            </Button>
          </div> */}
          <IconButton
            color="inherit"
            onClick={onRemoveClick}
            className="m-0! p-0!"
          >
            <IconMuis
              className=""
              iconName={item.quantity == 1 ? "delete" : "remove"}
            />
          </IconButton>
          <p className="flex w-8 justify-center">{item.quantity}</p>
          {/* <div className="w-6 overflow-hidden">
            <Button
              color="inherit"
              disableRipple
              className="m-0! flex! justify-start! p-0!"
              onClick={onAddClick}
            >
               <IconMuis className="" iconName={ "add"} />
            </Button>
          </div> */}
          <IconButton
            color="inherit"
            onClick={onAddClick}
            className="m-0! p-0!"
          >
            <IconMuis className="" iconName={"add"} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
