import { Divider, IconButton } from "@mui/material"
import IconMuis from "./IconMuis"
import Image from "next/image"
import useCartItems from "@/hooks/useCartItems"
import backendApis from "@/utils/apis"
import clsx from "clsx"

export function CartItems() {
  const cartItems = useCartItems()
  const products = backendApis.listEngineersItems()
  const list = cartItems.list!
  console.log("cart: rendering")
  return (
    <div>
      {list.map((item: any, idx: number) => (
        <div key={idx}>
          <CartItemRow
            {...{
              item,
              product: products.find((p) => p.id == item.id),
              cartItems,
            }}
          />
          {idx < list.length - 1 && (
            <div className="px-4">
              <Divider className="" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function CartItemRow(props: any) {
  const { item, cartItems, product } = props
  //const cartItems = useCartItems()
  const onAddClick = () => cartItems.add(item.id)
  const onRemoveClick = () => cartItems.removeByQty(item.id, 1)

  console.log("cartitem: re-rendering", item.quantity)

  return (
    <div className="flex w-full py-4">
      {/** tip: the correct way to deal with images  */}
      <div className="flex h-full w-[25%]">
        <div
          className={clsx(
            "relative h-16 w-16 overflow-hidden rounded-2xl! border border-gray-400",
            false && "m-4",
          )}
        >
          <Image className="object-cover" src={product.image} fill alt="" />
        </div>
      </div>
      <div className="flex w-[50%] items-center">
        <div className="flex h-16 flex-col justify-between">
          <p className="w-full font-bold">{product.name}</p>
          <p className="w-full text-gray-600">Tk {product.price}</p>
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
