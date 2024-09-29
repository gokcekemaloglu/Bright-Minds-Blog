import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getBlogsDataSuccess } from '../features/blogSlice'
import { axiosPublic } from './useAxios'

const useBlogCalls = () => {

  const dispatch = useDispatch()

  const getBlogsData = async (endpoint) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic(`${endpoint}/`)
      // console.log(data);
      dispatch(getBlogsDataSuccess({blog:data.data, endpoint}))      
    } catch (error) {
      console.log(error);      
      dispatch(fetchFail())
    }
  }
  
  
  return {getBlogsData}
}

export default useBlogCalls