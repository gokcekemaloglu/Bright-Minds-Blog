import { useState } from "react"
import { Box, Typography, Container, CircularProgress } from "@mui/material"
import AccountForm from "../components/auth/AccountForm"
import AccountChangePasswordForm from "../components/auth/AccountChangePasswordForm"
import AccountDelete from "../components/auth/AccountDelete"
import AccountUploadProfilePicture from "../components/auth/AccountUploadProfilePicture"

const Account = () => {
  // This part will be handled with Redux in your actual implementation
  // Using example data for now
  const [loading, setLoading] = useState(false)
  const [singleUser, setSingleUser] = useState({
    firstName: "John",
    lastName: "Doe",
    userName: "johndoe",
    email: "john@example.com",
    phone: "+90 555 123 4567",
    profession: "Developer",
    address: "Istanbul, Turkey",
    profilePicture: "/placeholder.svg?height=150&width=150",
  })

  const id = "user-id"
  const isActive = true

  // Örnek fonksiyonlar - Redux ile değiştirilecek
  const handleChange = (e) => {
    setSingleUser({
      ...singleUser,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updating user:", singleUser)
    // updateMe(id, singleUser);
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
      <AccountChangePasswordForm id={id} />

      {/* Account Delete Field */}
      <AccountDelete id={id} isActive={isActive} />
    </Container>
  )
}

export default Account
