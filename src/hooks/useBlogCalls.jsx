import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, setData, setSingle } from '../features/blogSlice'
import useAxios, { axiosPublic } from './useAxios'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'

const useBlogCalls = () => {
  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const handleError = (error, fallbackMsg) => {
    dispatch(fetchFail(error?.response?.data?.message || fallbackMsg))
    toastErrorNotify(error?.response?.data?.message || fallbackMsg)
  }

  const getBlogsData = async (key = 'blogs', options) => {
    dispatch(fetchStart())
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) 
      
      const { data } = await axiosPublic(`${key}`, options)
      console.log('getBlogsData', data);
      dispatch(setData({ key, data }))
    } catch (error) {
      handleError(error, `Something went wrong while fetching ${key}!`)
    }
  }

  const getSingleBlog = async (id) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic(`blogs/${id}`)
      dispatch(setSingle({ key: 'blog', data }))
    } catch (error) {
      handleError(error, 'Something went wrong while fetching the blog!')
    }
  }

  const postBlog = async (endpoint = 'blogs', info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`${endpoint}/`, info)
      toastSuccessNotify('Successfully created your blog!')
    } catch (error) {
      handleError(error, 'Something went wrong while creating the blog!')
    } finally {
      getBlogsData('blogs', { params: { limit: 10, page: 1 } })
    }
  }

  const putBlog = async (id, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.put(`blogs/${id}`, info)
      toastSuccessNotify('Successfully updated your blog!')
    } catch (error) {
      handleError(error, 'Something went wrong while updating the blog!')
    } finally {
      getSingleBlog(id)
    }
  }

  const deleteBlog = async (id, page = 1) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`blogs/${id}`)
      toastSuccessNotify('Successfully deleted your blog!')
    } catch (error) {
      handleError(error, 'Something went wrong while deleting the blog!')
    } finally {
      getBlogsData('blogs', { params: { limit: 10, page } })
    }
  }

  const postLikeBlog = async (blogId, blogInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`blogs/${blogId}/postLike`, blogInfo)
    } catch (error) {
      handleError(error, 'Something went wrong while liking the blog!')
    } finally {
      getSingleBlog(blogId)
    }
  }

  const getSingleUserBlogs = async (endpoint, options) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get(`blogs/${endpoint}/`, options)
      dispatch(setData({ key: 'singleUserBlogs', data }))
    } catch (error) {
      handleError(error, 'Something went wrong while fetching user blogs!')
    }
  }

  const getPublishedBlogs = async (endpoint, options) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.get(`blogs/${endpoint}/`, options)
      dispatch(setData({ key: 'publishedBlogs', data }))
    } catch (error) {
      handleError(error, 'Something went wrong while fetching published blogs!')
    }
  }

  return {
    getBlogsData,
    postLikeBlog,
    getSingleBlog,
    postBlog,
    deleteBlog,
    putBlog,
    getSingleUserBlogs,
    getPublishedBlogs
  }
}

export default useBlogCalls