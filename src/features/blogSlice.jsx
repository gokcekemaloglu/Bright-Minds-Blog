import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    blogs: [],
    categories: [],
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
    getBlogsDataSuccess:(state,{payload}) => {
      state.loading = false;
      state.error = false;
      state[payload.endpoint] = payload.blog
      console.log("blogs:", payload)
    },    
    getLikeSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
    }
  },
});

export const {
  fetchStart,
  fetchFail,
  getBlogsDataSuccess,
 
} = blogSlice.actions;

export default blogSlice.reducer