import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wish, WishList } from "../interfaces";

interface AddWishPayload {
  listIndex: number;
  wish: Wish;
}

export const wishlistsSlice = createSlice({
  name: "wishlists",
  initialState: {
    value: [] as WishList[],
  },
  reducers: {
    addToLists: (state, action: PayloadAction<WishList>) => {
      console.log("redux", action.payload);
      state.value.push(action.payload);
    },
    removeWish: (
      state,
      action: PayloadAction<{ listIndex: number; wishIndex: number }>
    ) => {
      const { listIndex, wishIndex } = action.payload;
      state.value[listIndex].wishes.splice(wishIndex, 1);
    },
    addWishToList: (state, action: PayloadAction<AddWishPayload>) => {
      const { listIndex, wish } = action.payload;
      state.value[listIndex].wishes.push(wish);
    },
  },
});

export const { addToLists, removeWish, addWishToList } = wishlistsSlice.actions;

export default wishlistsSlice.reducer;
