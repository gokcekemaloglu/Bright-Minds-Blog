import React from 'react'
import { useDispatch } from 'react-redux'
import {fetchFail, fetchStart, registerSuccess} from "../features/authSlice"
import { axiosPublic } from './useAxios'
import { useNavigate } from 'react-router-dom'

const useAuthCall = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.post("users/", userInfo)
      dispatch(registerSuccess(data))
      navigate("/")
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
    }
  }

  return {register}
}

export default useAuthCall