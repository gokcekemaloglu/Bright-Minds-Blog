import { useState } from "react"
import { Box, Typography, Container, CircularProgress } from "@mui/material"
import AccountForm from "../components/auth/AccountForm"
import AccountChangePasswordForm from "../components/auth/AccountChangePasswordForm"
import AccountDelete from "../components/auth/AccountDelete"
import AccountUploadProfilePicture from "../components/auth/AccountUploadProfilePicture"
import { useSelector } from "react-redux"
import { getSingleUserSuccess } from "../features/userSlice"
import { useEffect } from "react"
import useUserCall from "../hooks/useUserCall"
import { useDispatch } from "react-redux"

const Account = () => {
  const dispatch = useDispatch()
  const {currentUserId} = useSelector(state => state.auth)
  const {singleUser, loading} = useSelector(state => state.users)

  const {getSingleUser, updateMe} = useUserCall()

  console.log(currentUserId);

  useEffect(() => {
    getSingleUser(currentUserId)
  }, [])

  const isActive = true

  const handleChange = (e) => {
    dispatch(getSingleUserSuccess({
      ...singleUser,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updating user:", singleUser)
    updateMe(currentUserId, singleUser);
  }

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        alignSelf: "stretch",
        bgcolor: "background.paper",
        px: { xs: 2, md: 6 },
        // py: 8,
        boxShadow: 1,
        color: "text.primary",
        // mt: 2,
      }}
    >
      {/* Update Profile Section */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "576px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 10,
          borderBottom: 1,
          borderColor: "divider",
          pb: 4,
          mt: 10,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
          <Typography variant="h3" fontWeight="600">
            Account
          </Typography>
          <Typography variant="body1" fontWeight="600">
            Update your profile and personal details here
          </Typography>
        </Box>

        {/* Profile Section */}
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
          <Typography variant="h4" fontWeight="600" mb={4}>
            Profile
          </Typography>

          {/* Profile Picture Section */}
          <AccountUploadProfilePicture singleUser={singleUser} />

          {/* Personal Info Field */}
          <AccountForm handleChange={handleChange} handleSubmit={handleSubmit} singleUser={singleUser} />
        </Box>
      </Box>

      {/* Change Password Field */}
      <AccountChangePasswordForm id={currentUserId} />

      {/* Account Delete Field */}
      <AccountDelete id={currentUserId} isActive={isActive} />
    </Container>
  )
}

export default Account
