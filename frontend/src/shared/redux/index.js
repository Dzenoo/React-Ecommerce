import { configureStore } from "@reduxjs/toolkit";

import CartSlice from "./cart-slice";
import FavoritesSlice from "./fav-slice";

const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
  },
});

export default store;
