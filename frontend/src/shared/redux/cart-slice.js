import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  totalQuantity: 0,
  subTotal: localStorage.getItem("subTotal") || 0,
};

if (localStorage.getItem("cart") !== null) {
  initialState.totalQuantity = JSON.parse(localStorage.getItem("cart")).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          image: newItem.image,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          option: newItem.option,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          parseInt(existingItem.totalPrice) + parseInt(newItem.price);
      }

      state.subTotal = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("subTotal", state.subTotal);
    },

    RemoveFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          parseInt(existingItem.totalPrice) - parseInt(existingItem.price);
      }

      state.subTotal = state.items.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("subTotal", state.subTotal);
    },
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice;
