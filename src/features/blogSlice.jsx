import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  blogs: {},
  categories: {},
  comments: [],
  stats: {},
  blog: {
    _id: '',
    title: '',
    content: '',
    image: '',
    userId: '',
    categoryId: '',
    likes: [],
    comments: [],
    countOfVisitors: 0,
    createdAt: '',
  },
  singleUserBlogs: {},
  publishedBlogs: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload || 'An error occurred';
    },
    setData: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state[payload.key] = payload.data;
    },
    setSingle: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state[payload.key] = payload.data;
    },
  },
});

export const { fetchStart, fetchFail, setData, setSingle } = blogSlice.actions;

export default blogSlice.reducer;