import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./auth-slice";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer },
});

export default store;
