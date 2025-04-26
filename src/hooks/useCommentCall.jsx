import React from 'react'
import { fetchFail, fetchStart, getSingleBlogCommentsSuccess } from '../features/commentSlice';
import { useDispatch } from 'react-redux';
import useAxios from './useAxios';
import { toastErrorNotify } from '../helper/ToastNotify';

const useCommentCall = () => {
    const dispatch = useDispatch()
    const axiosWithToken = useAxios()

    const getSingleBlogComments = async (blogId) => {
        dispatch(fetchStart());
        try {
          const { data } = await axiosWithToken.get(
            `comments/blog/${blogId}`
          );
          dispatch(getSingleBlogCommentsSuccess(data.data));
        } catch (error) {
          dispatch(fetchFail());
          toastErrorNotify( error.response.data.message || "Something went wrong while fetching comments of the blog" );
        }
      };

  return {
    getSingleBlogComments,
  }
}

export default useCommentCall