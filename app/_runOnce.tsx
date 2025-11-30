'use client'

import { useGlobalState } from "@/stores/useGlobalState"
import { useEffect } from "react"


/**
 * 
 * note: i definitely could have used zustand 'persist()' middleware.
 */
export function RunOnce() {
const setCartItems = useGlobalState(state => state.setCartItems)

    useEffect(() => {
console.log('RunOnce: ------------------- executed only once ever!')

const s = window.localStorage.getItem('cartItems') || '[]'
const list = JSON.parse(s)
setCartItems(list)

const fn = () => {

const s = window.localStorage.getItem('cartItems') || '[]'
const list = JSON.parse(s)
setCartItems(list)
}

window.addEventListener('storage', fn)

return () => {
    // note: i also could have a used a useCart() library from any popular react github project.
    // and i didn't even know this usecase until i came across the 'storage' event.
    //
    // note: again, i could have just used zustand's persist().
    window.addEventListener('storage', fn)
}

    }, [])
    return null
}