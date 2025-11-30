import { useGlobalState } from "@/stores/useGlobalState"
import { useMediaQuery, useTheme } from "@mui/material"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export default function useCartItems() {
  const prevCartItems = useRef<any>(null)
  // note: using selector to only get the setter function,
  // prevents a re-render caused by the globalState.cartItemsCount
  // value's change.
  //
  // now, alhamdulillah, this component only renders once when the add()
  // function is called.
  const setCartItemsCount = useGlobalState((state) => state.setCartItemsCount)
  const setCartModalOpen = useGlobalState((state) => state.setCartModalOpen)
  const globalState = { setCartItemsCount, setCartModalOpen }
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const isDesktop = !isMobile
  const cartItems = useGlobalState((s) => s.cartItems)
  const _setCartItems = useGlobalState((s) => s.setCartItems)
  const setCartItems = (items: typeof cartItems) => {
    _setCartItems(items)
    window.localStorage.setItem("cartItems", JSON.stringify(items))
  }

  /**
   * note: the individual add and remove functions
   * have been wrapped in usecallback. otherwise when
   * this hook re-renders due to changes in 'cartitems',
   * a new function will declared and the returning
   * object {add, remove, list} will be a new object.
   */
  const add = useCallback(
    (id: any) => {
      let result: typeof cartItems
      const copy = [...cartItems]
      const idx = copy.findIndex((ci) => ci.id == id)

      if (idx === -1) {
        result = [...copy, { id: id, quantity: 1 }]
      } else {
        copy[idx].quantity = copy[idx].quantity + 1
        result = copy
      }

      setCartItems(result)
    },
    [cartItems],
  )

  const remove = useCallback(
    (id: any) => {
      const result = cartItems.filter((p) => p.id != id)
      setCartItems(result)
    },
    [cartItems],
  )

  const removeByQty = useCallback(
    (id: any, qty: number) => {
      let result: typeof cartItems
      const copy = [...cartItems]

      const idx = cartItems.findIndex((p) => p.id === id)
      if (idx === -1) return cartItems
      if (copy[idx].quantity > qty) {
        copy[idx].quantity -= qty
        result = copy
      } else {
        // remove the item if quantity after removal is 0 or less
        copy.splice(idx, 1)
        result = copy
      }

      setCartItems(result)
    },
    [cartItems],
  )

  // note: the only correct way to react to state changes
  // and make a save elsewhere to use an useeffect.
  // calling a function in add() and remove() won't ever work.
  // because state updates are async, so the function invoke
  // will see sad stale data.
  //
  // the ref check here is added to prevent the 1 redudant update
  // to the localstorage as the 'cartitems' array is filled
  // from the localstorage for the first time by the empty-deps
  // effect.
  //
  // alhamdulillah. all works perfect.
  //
  // (code removed.)

  // note: using Object.values() with useMemo during a return from a hook
  // would be a horrible mistake,
  // because it would create a new object reference everytime.
  //
  // (code removed.)

  return { list: cartItems, add, remove, removeByQty }
}
