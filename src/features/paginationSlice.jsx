import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    pagUsers: [],
    pagCategories: [],
    pagBlogs: [],
    pagComments: [],
    pagFilteredComments: [],
    pagPublishedBlogs: [],
    pagFilteredBlogs: [],
    pagSingleUserBlogs: [],
    currentPage: 1,
    itemsPerPage: 10,
    loading: false,
    error: false,
    // totalRecords: 0
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    // getPagDataSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = false;
    //   state.data = payload.data;
    //   state[payload.slice] = payload.data;
    // },
    getPagDataSuccess: (state, { payload }) => {
      console.log(payload);
      
      state.loading = false;
      state.error = false;
      state.data = payload.data.data;
      state.totalRecords = payload.data.details.totalRecords;
      state[payload.slice] = payload.data.data;
    },
    setPage: (state, { payload }) => {
      state.currentPage = payload;
      state.loading = false
      state.error = false
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
    fetchStart,
    getPagDataSuccess,
    setPage,
    fetchFail
} = paginationSlice.actions;
export default paginationSlice.reducer;
