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

export function NavBar() {
  const cartItemsCount = useGlobalState((state) => state.cartItemsCount)
  const isCartModalOpen = useGlobalState((state) => state.isCartModalOpen)
  const setCartModalOpen = useGlobalState((state) => state.setCartModalOpen)
  const hasCartItems = !!cartItemsCount

  return (
    <div className="fixed top-0 left-0 z-50 flex min-h-24 w-full px-4 py-4 backdrop-blur-sm md:min-h-24 md:px-8 md:py-2">
      <div className="flex w-[80%] items-center">
        <Logo />
      </div>
      <div className="flex w-[20%] items-center justify-end">
        <IconButton className="mr-4">
          <IconMuis className="" iconName="dark_mode" />
        </IconButton>

        <IconButton
          onClick={() => {
            setCartModalOpen(true)
          }}
        >
          <Badge badgeContent={cartItemsCount} color="warning">
            <IconMuis iconName="local_mall" />
          </Badge>
        </IconButton>
        <CartDialog
          open={isCartModalOpen}
          onClose={() => setCartModalOpen(false)}
          hasCartItems={hasCartItems}
        />
      </div>
    </div>
  )
}

function Logo() {
  const [logoCaptionIdx, setLogoCaptionIdx] = useState(0)
  const list = [
    `Missed breakfast today? We did too.`,
    `More coffee, better code.`,
    `Return to office mandate? Straight to kitchen!`,
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
    <div className="w-full">
      <Link className="flex" underline="none" href="/">
        <p className="flex justify-center border-2 border-black p-0 font-mono text-4xl leading-none text-black">
          SWE BRUNCH
        </p>
      </Link>
      <div className="">
        <p className="hidden text-sm md:block">{logoCaption}</p>
      </div>
    </div>
  )
}

type CartDialogProps = {
  open: boolean
  onClose: () => void
  hasCartItems: boolean
}

function CartDialog({ open, onClose, hasCartItems }: CartDialogProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <div className="relative">
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={false}
        fullScreen={fullScreen}
        hideBackdrop={true}
        slotProps={{
          paper: {
            // note: probably using absolute instead of fixed, since mui adds a layer equal
            // screen dimensions as a first child of body.
            className:
              "absolute! pt-4! md:top-[40px]! md:right-[0px]! md:m-0 md:w-[400px]! md:max-h-[80%]!",
            // note: move sx to classname for easier css based on screensize.
            /*sx: {
            position: "absolute",
            top: 80,
            right: 16,
            margin: 0,
            width: { xs: "calc(100% - 32px)", sm: 420, md: 520 },
            borderRadius: 2,
            boxShadow: 6,
          }, */
          },
        }}
      >
        <div className="flex">
          <DialogTitle className="w-4/5">Your Items</DialogTitle>
          <div className="flex w-1/5 items-center justify-center">
            <IconButton className="" onClick={onClose}>
              <IconMuis iconName="close" />
            </IconButton>
          </div>
        </div>
        <DialogContent className="">
          {hasCartItems && (
            <div>
              <CartItems />
              {/** note: intentionally using &>.info-line as a learning note.
               * Works like a charm regardless.
               */}
              <div className="[&>.info-line]:mt-2">
                <Divider className="mb-8!" />
                <div className="info-line flex justify-between">
                  <p>Subtotal</p>
                  <p>Tk 890</p>
                </div>
                <div className="info-line flex justify-between">
                  <p>Standard Delivery Charge</p>
                  <p>Tk 24</p>
                </div>
                <div className="info-line flex justify-between">
                  <p>Service Fee</p>
                  <p>Tk 17</p>
                </div>
              </div>
            </div>
          )}

          {!hasCartItems && (
            <div className="flex h-full w-full items-center justify-center select-none">
              <div className="">
                <IconMuis
                  className="flex! justify-center! text-7xl! text-gray-400!"
                  iconName="shopping_cart"
                />
                <p className="text-gray-400">Cart is empty</p>
              </div>{" "}
            </div>
          )}
        </DialogContent>

          <DialogActions className="flex! justify-center! py-4!">
            {hasCartItems && (
              <Button className="flex! rounded-full! bg-black! px-8! py-4! text-base! font-bold! text-white! normal-case!">
                <span>Pay Tk 890 &nbsp;</span>{" "}
                <IconMuis
                  className="text-md!"
                  iconName="arrow_right_alt"
                ></IconMuis>
              </Button>
            )}
          </DialogActions>
      </Dialog>
    </div>
  )
}
