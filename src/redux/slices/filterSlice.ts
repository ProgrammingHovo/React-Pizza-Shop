import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sort = {
  sortName: string;
  sortType: "rating" | "price" | "title" | "-rating" | "-price" | "-title";
};

export interface FilterSliceType {
  searchValue: string;
  categoryId: number;
  sortObj: Sort;
  currentPage: number;
}

const initialState: FilterSliceType = {
  searchValue: "",
  categoryId: 0,
  sortObj: { sortName: "популярности", sortType: "rating" },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sortObj = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action: PayloadAction<FilterSliceType>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortObj = action.payload.sortObj;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
