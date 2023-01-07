import { configureStore } from "@reduxjs/toolkit";

import CartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
  },
});

export default store;
