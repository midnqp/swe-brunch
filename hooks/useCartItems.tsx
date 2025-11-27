import { useGlobalState } from "@/stores/useGlobalState"
import { useMediaQuery, useTheme } from "@mui/material"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export default function useCartItems() {
  // note: remember array modifications do NOT trigger state changes.
  const [cartItems, _setCartItems] = useState<null | Array<
    Record<string, any>
  >>(null)
  const prevCartItems = useRef<any>(null)
  // note: using selector to only get the setter function,
  // prevents a re-render caused by the globalState.cartItemsCount
  // value's change.
  //
  // now, alhamdulillah, this component only renders once when the add()
  // function is called.
  const setCartItemsCount = useGlobalState((state) => state.setCartItemsCount)
  const setCartModalOpen = useGlobalState(state => state.setCartModalOpen)
  const globalState = { setCartItemsCount, setCartModalOpen }
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'))
  const isDesktop = !isMobile

  const setCartItems: typeof _setCartItems = (valueOrReducer) => {
    _setCartItems(valueOrReducer)
    /*_setCartItems((prev) => {
      const s = window.localStorage.getItem("cartItems") || "[]"
      const list = JSON.parse(s)
      const updated = typeof valueOrReducer == 'function' ? valueOrReducer(list) : list
      //window.localStorage.setItem("cartItems", JSON.stringify(updated))
      return updated
    }) */
  }

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
  }, [setCartItems])

  const remove = useCallback((id: any) => {
    setCartItems((prev) => prev!.filter((p) => p.id != id))
  }, [setCartItems])

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
        // remove the item if quantity after removal is 0 or less
        copy.splice(idx, 1)
        return copy
      }
    })
  }, [setCartItems])

  useEffect(() => {
    //console.log("usecartitems: useeffect first render")
    //loadFromLocalStorage()


    const s = window.localStorage.getItem("cartItems") || "[]"
    const list = JSON.parse(s)
    _setCartItems(list)
    prevCartItems.current = list
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
    console.log("useCartItems: cartItems changed")
    if (cartItems == null) return
    if (prevCartItems.current == cartItems) return
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
    globalState.setCartItemsCount(cartItems.length)
    console.log("usecartitems: updating cart local storage", cartItems.length)
    if (isDesktop && cartItems.length == 1 && prevCartItems.current.length == 0) globalState.setCartModalOpen(true)
    prevCartItems.current = cartItems
  }, [cartItems])

  // note: using Object.values() would be a horrible mistake, 
  // because it would create a new object reference everytime.
  /*return useMemo(() => {
    console.log('useCartItems :: returning new memoized object')
    // note
    // remember array modifications do NOT trigger state changes.
    return { list: cartItems || [], add, remove, removeByQty }
  }, [cartItems])
  */
 let __cartItems : any = cartItems
 if (__cartItems == null) __cartItems = []
 return {list: __cartItems, add, remove, removeByQty}
}
