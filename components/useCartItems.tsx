import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export default function useCartItems() {
  const [cartItems, setCartItems] = useState<null | Array<Record<string, any>>>(null)
  const prevCartItems = useRef<any>(null)

  useEffect(() => {
    const s = window.localStorage.getItem("cartItems") || "[]"
    const list = JSON.parse(s)
    setCartItems(list)
    prevCartItems.current = list
    console.log('loaded cart from localstorage', list.length)
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
    if (prevCartItems.current == cartItems ) return
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
    console.log('updating cart local storage', cartItems.length)
    prevCartItems.current  = cartItems
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
      const ci = prev.findIndex((ci) => ci.id == id)
      if (ci === -1) {
        return [...prev, { id: id, quantity: 1 }]
      } else {
        const copy = [...prev]
        copy[ci].quantity = copy[ci].quantity + 1
        return copy
      }
    })
  }, [])

  const remove = useCallback((id: any) => {
    setCartItems(prev => prev!.filter(p => p.id != id))
  }, [])

  // note: the returning object made up of list, add, remove, etc should be memoized so that users of this hook doesn't get a new object unless list, add, remove, etc *actually* changed.
  const list = cartItems
  const result = {list, add, remove}
  if (cartItems == null) result.list = []
  return useMemo(() => (result), [list, add, remove])
}
