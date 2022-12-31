import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "favorites",
  initialState: { favItems: [] },
  reducers: {
    AddToFavorite(state, action) {
      const newItem = action.payload;
      const existingItem = state.favItems.find((i) => i.id === newItem.id);

      if (!existingItem) {
        state.favItems.push({
          id: newItem.id,
          image: newItem.image,
          title: newItem.title,
          description: newItem.description,
        });
      }
    },

    RemoveFromFavorite(state, action) {
      const id = action.payload;
      state.favItems = state.favItems.filter((i) => i.id !== id);
    },
  },
});

export const FavoriteActions = FavoriteSlice.actions;
export default FavoriteSlice;
