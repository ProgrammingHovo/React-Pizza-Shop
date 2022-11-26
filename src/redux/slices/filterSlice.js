import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: 0,
  sortObj: { sortName: "популярности", sortType: "rating" },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sortObj = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortObj = action.payload.sort;
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
