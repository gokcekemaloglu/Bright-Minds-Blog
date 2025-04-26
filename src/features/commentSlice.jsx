import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: "comment",

  initialState: {
    loading: false,
    error: false,
    comments: [],
    singleBlogComments: [],
  }, 
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getSingleBlogCommentsSuccess: (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.singleBlogComments = payload;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getSingleBlogCommentsSuccess,
} = commentSlice.actions;

export default commentSlice.reducer