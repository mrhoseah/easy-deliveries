import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type LikesState = {
  likedIds: number[]
}

const initialState: LikesState = {
  likedIds: [],
}

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const id = action.payload
      const index = state.likedIds.indexOf(id)
      if (index === -1) {
        state.likedIds.push(id)
      } else {
        state.likedIds.splice(index, 1)
      }
    },
  },
})

export const { toggleLike } = likesSlice.actions
export default likesSlice.reducer


