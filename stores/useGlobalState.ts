import { create } from "zustand"

type GlobalState = {
  cartItemsCount: number
  //setCartItemsCount: (value: number) => void
  isCartModalOpen: boolean
  setCartModalOpen: (value: boolean) => void
  cartItems: Array<{ id: any; quantity: number }>
  setCartItems: (value: GlobalState['cartItems']) => void
}

export const useGlobalState = create<GlobalState>(
  (set) =>
    ({
      // todo: can i get rid of this? or i need it?
      cartItemsCount: 0,
      //setCartItemsCount: (value) => set({ cartItemsCount: value }),

      isCartModalOpen: false,
      setCartModalOpen: (value) => set({ isCartModalOpen: value }),

      cartItems: [],
      setCartItems: (value) => 

        set({ cartItems: value, cartItemsCount: value.length })
      ,
    }) as const,
)
