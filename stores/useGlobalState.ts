import {create} from 'zustand'

export const useGlobalState = create((set ) => ({
    cartItemsCount: 0,
    setCartItemsCount:  (value: number) => set({cartItemsCount: value})
}))