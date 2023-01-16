import { createSlice } from "@reduxjs/toolkit";

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: [] },
  reducers: {
    AddToFav(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items = [
          ...state.items,
          {
            id: newItem.id,
            image: newItem.image,
            title: newItem.title,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
            option: newItem.option,
          },
        ];
      }
    },

    RemoveFromFav(state, action) {
      const id = action.payload;
      state.items = [...state.items.filter((item) => item.id !== id)];
    },
  },
});

export const favActions = FavoritesSlice.actions;
export default FavoritesSlice;
