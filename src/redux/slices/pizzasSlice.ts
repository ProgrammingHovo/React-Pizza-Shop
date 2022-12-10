import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartSlice";
import { Sort } from "./filterSlice";

type Pizza = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

type FetchPizzasArgs = {
  sort: string;
  order: string;
  categoryId: number;
  currentPage: number;
};

interface PizzaItemType {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzasStatus",
  async ({ sort, order, categoryId, currentPage }: FetchPizzasArgs) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6361406067d3b7a0a6c21c0d.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ""
      }&sortBy=${sort}&order=${order}`
    );
    return data as Pizza[];
  }
);

const initialState: PizzaItemType = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
