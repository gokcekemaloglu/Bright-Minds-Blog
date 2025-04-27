import {
  fetchFail,
  fetchStart,
  getSingleBlogCommentsSuccess,
} from "../features/commentSlice";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useCommentCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const getSingleBlogComments = async (blogId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`comments/blog/${blogId}`);
      dispatch(getSingleBlogCommentsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while fetching comments of the blog"
      );
    }
  };

  const postComment = async (comments, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${comments}/`, info);
      toastSuccessNotify("Successfully posted your comment")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while posting comment of the blog"
      );
    } finally {
      getSingleBlogComments(info.blogId);
    }
  };

  const putComment = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`comments/${id}`, info);
      toastSuccessNotify("Successfully updated your comment")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while updating the comment of the blog"
      );
    } finally {
      getSingleBlogComments(info.blogId);
    }
  };

  const deleteComment = async (_id, blogId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`comments/${_id}`);
      toastSuccessNotify("Successfully deleted your comment")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while deleting the comment of the blog"
      );
    } finally {
      getSingleBlogComments(blogId);
    }
  };

  return {
    getSingleBlogComments,
    postComment,
    putComment,
    deleteComment,
  };
};

export default useCommentCall;
