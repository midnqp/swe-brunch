"use client"
import useCartItems from "@/hooks/useCartItems"
import backendApis from "@/utils/apis"
import { useTheme } from "@mui/material"
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Divider,
  DialogActions,
  Button,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { CartItems } from "./Cart"
import IconMuis from "./IconMuis"
import { useGlobalState } from "@/stores/useGlobalState"

type CartDialogProps = {
  open: boolean
  onClose: () => void
  hasCartItems: boolean
}

export function CartDialog({ open, onClose, hasCartItems }: CartDialogProps) {
  const cartItems = useCartItems()
  const router = useRouter()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const setCartModalOpen = useGlobalState((s) => s.setCartModalOpen)

  const subtotal = cartItems.list.reduce((prev, curr) => {
    const product = backendApis.getAllItems().find((p) => p.id === curr.id)
    return prev + (product?.price || 0) * curr.quantity
  }, 0)
  const serviceFreeCost = 17
  const deliveryCost = 24
  const grandTotal = subtotal + serviceFreeCost + deliveryCost

  const onPayClick = async () => {
    // todo: skipped the address, payment card, etc for now.
    await backendApis.createOrder({ items: cartItems.list })
    router.push("/thanks")
    setCartModalOpen(false)
    cartItems.removeAll()
  }

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
                  <p>Tk {subtotal}</p>
                </div>
                <div className="info-line flex justify-between">
                  <p>Standard Delivery Charge</p>
                  <p>Tk {deliveryCost}</p>
                </div>
                <div className="info-line flex justify-between">
                  <p>Service Fee</p>
                  <p>Tk {serviceFreeCost}</p>
                </div>
              </div>
            </div>
          )}

          {!hasCartItems && (
            <div className="flex h-full w-full items-center justify-center select-none">
              <div className="*:flex! *:justify-center!">
                <IconMuis
                  className="text-7xl! text-gray-400!"
                  iconName="shopping_cart"
                />
                <p className="text-gray-400">Cart is empty</p>
                <p className="text-gray-300">Aren't you hungry?</p>
              </div>{" "}
            </div>
          )}
        </DialogContent>

        <DialogActions className="flex! justify-center! py-4!">
          {hasCartItems && (
            <Button
              onClick={onPayClick}
              className="flex! rounded-full! bg-black! px-8! py-4! text-base! font-bold! text-white! normal-case!"
            >
              <span>Pay Tk {grandTotal} &nbsp;</span>
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
