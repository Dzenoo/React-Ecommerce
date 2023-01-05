import { configureStore } from "@reduxjs/toolkit";

import FavoriteSlice from "./favorite-slice";
import CartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    favorite: FavoriteSlice.reducer,
  },
});

export default store;
