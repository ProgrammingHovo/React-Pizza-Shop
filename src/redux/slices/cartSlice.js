import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);

      findItem.count--;

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = 0;

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
