import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, subTotal: 0 },
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

        state.subTotal = state.items.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        );
      }
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
    },
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice;
