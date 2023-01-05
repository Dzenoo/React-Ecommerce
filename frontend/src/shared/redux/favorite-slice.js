import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItems: JSON.parse(localStorage.getItem("favorites")) || [],
};

const FavoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    AddToFavorite(state, action) {
      const newItem = action.payload;
      const existingItem = state.favItems.find((i) => i.id === newItem.id);

      if (!existingItem) {
        state.favItems.push({
          id: newItem.id,
          image: newItem.image,
          title: newItem.title,
          price: newItem.price,
          inStock: newItem.inStock,
          description: newItem.description,
        });
      }

      localStorage.setItem("favorites", JSON.stringify(state.favItems));
    },

    RemoveFromFavorite(state, action) {
      const id = action.payload;
      state.favItems = state.favItems.filter((i) => i.id !== id);

      localStorage.setItem("favorites", JSON.stringify(state.favItems));
    },
  },
});

export const FavoriteActions = FavoriteSlice.actions;
export default FavoriteSlice;
