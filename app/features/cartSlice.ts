import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ id: number; name: string; price: number; image: string; quantity?: number }>) {
      const { id, name, price, image, quantity = 1 } = action.payload
      const existing = state.items.find(i => i.id === id)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ id, name, price, image, quantity })
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ id: number; delta: number }>) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (!item) return
      item.quantity = Math.max(0, item.quantity + action.payload.delta)
      if (item.quantity === 0) {
        state.items = state.items.filter(i => i.id !== action.payload.id)
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer


