import { create } from "zustand"

type GlobalState = {
  cartItemsCount: number
  setCartItemsCount: (value: number) => void
  isCartModalOpen: boolean
  setCartModalOpen: (value: boolean) => void
}

export const useGlobalState = create<GlobalState>(
  (set) =>
    ({
      cartItemsCount: 0,
      setCartItemsCount: (value: number) => set({ cartItemsCount: value }),
      isCartModalOpen: false,
      setCartModalOpen: (value: boolean) => set({ isCartModalOpen: value }),
    }) as const,
)
