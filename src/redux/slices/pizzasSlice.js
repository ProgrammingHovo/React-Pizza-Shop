import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzasStatus",
  async ({ sort, order, categoryId, currentPage }) => {
    const { data } = await axios.get(
      `https://6361406067d3b7a0a6c21c0d.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ""
      }&sortBy=${sort}&order=${order}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
