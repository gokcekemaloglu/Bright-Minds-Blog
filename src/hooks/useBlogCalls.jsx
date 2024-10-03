import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getBlogsDataSuccess } from '../features/blogSlice'
import useAxios, { axiosPublic } from './useAxios'
import { useState } from 'react'

const useBlogCalls = () => {



  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

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

  // const getLike = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const {data} = await axiosWithToken(`blogs/${}/getLike`)
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail())
      
  //   }
  // }

  const postLike = async (blogId, blogInfo) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.post(`blogs/${blogId}/postLike`,blogInfo)
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())      
    } 
  }

  
  
  
  return {getBlogsData, postLike}
}

export default useBlogCalls