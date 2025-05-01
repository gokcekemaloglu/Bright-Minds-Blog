import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getBlogsDataSuccess, getSingleBlogSuccess, postLikeSuccess } from '../features/blogSlice'
import useAxios, { axiosPublic } from './useAxios'
import { toastErrorNotify } from '../helper/ToastNotify'
// import { useSelector } from 'react-redux'
// import axios from 'axios'

const useBlogCalls = () => {

  // const {currentUserId} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const getBlogsData = async (endpoint, options) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic(`${endpoint}/`, options)
      // console.log(data);
      dispatch(getBlogsDataSuccess({blog:data.data, endpoint}))      
    } catch (error) {
      console.log(error);      
      dispatch(fetchFail())
    }
  }

  // const getLike = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const {data} = await axiosWithToken(`blogs/${}/getLike`)
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail())
      
  //   }
  // }

  const postLikeBlog = async (blogId, blogInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`blogs/${blogId}/postLike`,blogInfo)
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message || "Something went wrong while liking the blog"
      );
    } finally {
      getSingleBlog(blogId)
    }
  }

  //? veri backend'den geldiği için bu fonksiyonu yoruma alıyoruz.
  // const postLike = async (blogId) => {
  //   try {
  //     const { data } = await axiosWithToken.post(`/blogs/${blogId}/postLike`);
  //     console.log(data, "countOfLikes");
  //     dispatch(
  //       postLikeSuccess({
  //         currentUserId,
  //         _id: blogId,
  //         countOfLikes: data.countOfLikes,
  //         didUserLike: data.didUserLike,
  //         endpoint: "blogs",
  //       })
  //     );
  //     console.log("Response data:", data); // Başarılı yanıtı buraya ekleyin
  //   } catch (error) {
  //     console.error(
  //       "Like işlemi sırasında hata oluştu:",
  //       error.response ? error.response.data : error.message
  //     );
  //     return null;
  //   }
  // };

  // const getComments = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const {data} = await axiosWithToken.get("comments/")
  //     dispatch(getCommentsSuccess(data.data))
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail())      
  //   } 
  // }

  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`blogs/${id}`);
      dispatch(getSingleBlogSuccess(data.data))
      console.log(data.data);
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postBlog = async (blogs, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`${blogs}/`, info)
    } catch (error) {
      dispatch(fetchFail())
    } finally {
      getBlogsData("blogs", { params: { limit: 10, page } })
    }
  }

  const deleteBlog = async (id) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`blogs/${id}`)
    } catch (error) {
      dispatch(fetchFail())
    } finally {
      getBlogsData("blogs", { params: { limit: 10, page } })
    }
  }
  
  
  return {
    getBlogsData, 
    postLikeBlog, 
    getSingleBlog,
    postBlog,
    deleteBlog,
  }
}

export default useBlogCalls