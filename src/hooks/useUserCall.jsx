import { useDispatch } from 'react-redux'
import useAxios from './useAxios'
import { fetchFail, fetchStart, getSingleUserSuccess } from '../features/userSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'

const useUserCall = () => {
  const dispatch = useDispatch()
  const axiosWithToken = useAxios()
  
  const getSingleUser = async(id) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get(`users/${id}`)
      dispatch(getSingleUserSuccess(data.data))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(error.response?.data?.message || "Something went wrong while fatching user!")
    }
  }

  // Update User's own profile
  const updateMe = async (id, userUpdateInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/updateMe`, userUpdateInfo)
      toastSuccessNotify("Updated successfully!!")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(error.response?.data?.message || "Something went wrong while updating your profile!")
    } finally {
      getSingleUser(id)
    }
  }
  
  return {
    updateMe,
    getSingleUser,
  }
}

export default useUserCall