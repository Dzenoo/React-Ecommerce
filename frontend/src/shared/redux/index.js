import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./auth-slice";
import FavoriteSlice from "./favorite-slice";
import CartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    cart: CartSlice.reducer,
    favorite: FavoriteSlice.reducer,
  },
});

export default store;
