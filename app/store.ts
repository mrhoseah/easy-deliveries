import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import likesReducer from './features/likesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      likes: likesReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>
export type AppDispatch = ReturnType<typeof makeStore>['dispatch']
