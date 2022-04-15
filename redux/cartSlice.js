import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
  totalQty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const exItem = state.products.find(
        (elem) =>
          elem._id === action.payload._id &&
          elem.size === action.payload.size &&
          elem.extras === action.payload.extras
      );

      if (exItem) {
        exItem.qty += action.payload.qty;
      } else {
        state.products.push(action.payload);
      }
      state.totalPrice += action.payload.price * action.payload.qty;
      state.totalQty += action.payload.qty;
    },

    clear: (state) => (state = initialState),
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
