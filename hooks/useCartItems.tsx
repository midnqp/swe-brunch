import { useGlobalState } from "@/stores/useGlobalState"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export default function useCartItems() {
  const [cartItems, setCartItems] = useState<null | Array<Record<string, any>>>(
    null,
  )
  const prevCartItems = useRef<any>(null)
  // note: using selector to only get the setter function,
  // prevents a re-render caused by the globalState.cartItemsCount
  // value's change.
  //
  // now, alhamdulillah, this component only renders once when the add()
  // function is called.
  const setCartItemsCount = useGlobalState((state) => state.setCartItemsCount)
  const globalState = { setCartItemsCount }

  useEffect(() => {
    console.log("usecartitems: useeffect first render")
    const s = window.localStorage.getItem("cartItems") || "[]"
    const list = JSON.parse(s)
    setCartItems(list)
    prevCartItems.current = list
    console.log("usecartitems: loaded cart from localstorage", list.length)
    globalState.setCartItemsCount(list.length)
  }, [])

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
  useEffect(() => {
    if (cartItems == null) return
    if (prevCartItems.current == cartItems) return
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
    globalState.setCartItemsCount(cartItems.length)
    console.log("usecartitems: updating cart local storage", cartItems.length)
    prevCartItems.current = cartItems
  }, [cartItems])

  /**
   * note: the individual add and remove functions
   * have been wrapped in usecallback. otherwise when
   * this hook re-renders due to changes in 'cartitems',
   * a new function will declared and the returning
   * object {add, remove, list} will be a new object.
   */
  const add = useCallback((id: any) => {
    setCartItems((prev) => {
      prev = prev!
      const idx = prev.findIndex((ci) => ci.id == id)
      if (idx === -1) {
        return [...prev, { id: id, quantity: 1 }]
      } else {
        const copy = [...prev]
        copy[idx].quantity = copy[idx].quantity + 1
        return copy
      }
    })
  }, [])

  const remove = useCallback((id: any) => {
    setCartItems((prev) => prev!.filter((p) => p.id != id))
  }, [])

  const removeByQty = useCallback((id: any, qty: number) => {
    setCartItems((prev) => {
      prev = prev!
      const idx = prev.findIndex((p) => p.id === id)
      if (idx === -1) return prev

      const copy = [...prev]
      if (copy[idx].quantity > qty) {
        copy[idx].quantity -= qty
        return copy
      } else {
        // Remove the item if quantity after removal is 0 or less
        copy.splice(idx, 1)
        return copy
      }
    })
  }, [])

  // note: the returning object made up of list, add, remove, etc should be memoized so that users of this hook doesn't get a new object unless list, add, remove, etc *actually* changed.
  let list = cartItems
  if (cartItems == null) list = []
  console.log(
    "--- usecartitems: id-1, qty-",
    list?.find((l) => l.id == 1)?.quantity,
  )
  const result = { list, add, remove, removeByQty }
  // note: using Object.values() would be a horrible mistake.
  //return useMemo(() => result, [...Object.values(result)])
  return useMemo(() => result, [list, add, remove, removeByQty])
}
