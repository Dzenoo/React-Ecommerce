import { createSlice } from "@reduxjs/toolkit";

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: [] },
  reducers: {
    AddToFav(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: newItem.id,
              image: newItem.image,
              title: newItem.title,
              price: newItem.price,
            },
          ],
        };
      }
    },
    RemoveFromFav(state, action) {
      const id = action.payload;
      return {
        ...state,
        items: [...state.items.filter((item) => item.id !== id)],
      };
    },
  },
});

export const favActions = FavoritesSlice.actions;
export default FavoritesSlice;
