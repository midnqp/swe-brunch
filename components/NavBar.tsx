import { useGlobalState } from "@/stores/useGlobalState"
import { IconButton, Badge, Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from "@mui/material"
import { useState, useEffect } from "react"
import IconMuis from "./IconMuis"
import { Cart } from "./Cart"
import useCartItems from "@/hooks/useCartItems"

export function NavBar() {
  const [logoCaptionIdx, setLogoCaptionIdx] = useState(0)
  const list = [
    `Missed breakfast today? We did too.`,
    `More coffee, better code.`,
    `Return to office mandate? Straight to kitchen!`,
    `Software Engineer's Brunch`,
  ]
  const logoCaption = list[logoCaptionIdx]

  const store: any = useGlobalState()
  const cartItemsCount = store.cartItemsCount
  const [showCart, setShowCart] = useState(false)
  //console.log("navbar: cart items count", cartItemsCount)

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
  const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <div className="fixed top-0 left-0 z-50 flex min-h-24 w-full px-8 py-2 backdrop-blur-sm">
      <div className="flex w-[80%] items-center">
        <div className="w-full">
          <div className="flex">
            <p className="flex justify-center border-2 border-black p-0 font-mono text-4xl leading-none text-black">
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
          <div className="">
            <p className="hidden text-sm md:block">{logoCaption}</p>
          </div>
        </div>
      </div>
      <div className="flex w-[20%] items-center justify-end">
        <IconButton className="mr-4">
          <IconMuis className="" iconName="dark_mode" />
        </IconButton>

        <IconButton
          onClick={() => {
            setShowCart(true)
          }}
        >
          <Badge badgeContent={cartItemsCount} color="warning">
            <IconMuis iconName="local_mall" />
          </Badge>
        </IconButton>
        <Dialog
          open={showCart}
          onClose={() => setShowCart(false)}
          fullWidth
          //maxWidth="md"
          maxWidth={false}
          fullScreen = {fullScreen}
          hideBackdrop={true}
          //keepMounted
          slotProps={{paper:{
            // note: probably using absolute instead of fixed, since mui adds a layer equal 
            // screen dimensions as a first child of body. 
            className: 'absolute!  md:top-[80px]! md:right-[16px]! md:m-0 md:w-[520px]!',
            /*sx: {
              position: "absolute",
              top: 80,
              right: 16,
              margin: 0,
              width: { xs: "calc(100% - 32px)", sm: 420, md: 520 },
              borderRadius: 2,
              boxShadow: 6,
            }, */
          }}}
        >
          <DialogTitle className="">Your Items</DialogTitle>
          {
            // h-screen md:h-fit
          }
          <DialogContent className="md:max-h-[70vh]">
            <Cart {...{products: items, cartItems}} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
