"use client"
import IconMuis from "@/components/icon"
import { PageLayout } from "@/components/page"
import useCartItems from "@/components/useCartItems"
import { IconButton } from "@mui/material"
import Image from "next/image"

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
  /*const items: Array<{ name: string; price: number }> = Array(10)
    .fill(food)
    .map((f, i) => ({ ...f, id:i, name: `Item ${i + 1}`, price: (i + 1) * 100 }))
    */

  // todo: this a global state. but i think the logic to increase it should be in the reducer???
  // get cart items from localstorage. have a function named usecartitems.
  const _cartItems = useCartItems()
  const cartItems = _cartItems.list
  const addToCart =  _cartItems.add

  return (
    <PageLayout>
      <h1 className="mb-8 text-4xl">Browse</h1>
      {/** tip: ideal layout for item menus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card {...{addToCart, item}} />
        ))}
      </div>
    </PageLayout>
  )
}

function Card(props: any) {
  const item = props.item

  return (
    <div className="border-gray-300 bg-white border rounded-md p-4">
      <div style={{}} className="relative">
        <IconButton
          onClick={() => props.addToCart(item.id)}
          className="absolute! bg-gray-300! rounded-full  h-8 w-8 top-0 right-0 z-10"
        >
          <IconMuis className="text-white!" iconName="add" />
        </IconButton>
        {/** todo: add the import the font files locally with custom font-name, then do the fill. */}
        {/*<IconButton className="absolute! bg-gray-300! rounded-full  h-8 w-8 top-0 right-0 mr-10! z-10">
          <IconMuis className="filled" iconName="favorite" />
        </IconButton> */}
      </div>
      {/** tip: how to work with next's image compo. */}
      <div className="relative w-full h-48">
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
