import { createSlice } from "@reduxjs/toolkit";
import { updatecart } from "../utils/cart/CartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((e) => e._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updatecart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updatecart(state);
    },
    ShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updatecart(state);
    },
    PaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updatecart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updatecart(state);
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  ShippingAddress,
  PaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
