import { useState } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

export const PasswordSchema = () =>
  Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/\d+/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[@$?!%&*]+/, "Password must contain at least one special character"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  })

const AccountChangePasswordForm = ({ id }) => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    retypePassword: false,
  })

  const handleClickShowPassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    })
  }

  const handleChangePassword = (values, actions) => {
    console.log("Changing password:", values)
    // In a real application, you would call your API here
    // changeMyPassword(id, values)
    actions.resetForm()
    actions.setSubmitting(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "576px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        borderBottom: 1,
        borderColor: "divider",
        pb: 4,
      }}
    >
      <Typography variant="h4" fontWeight="600">
        Password
      </Typography>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          retypePassword: "",
        }}
        validationSchema={PasswordSchema()}
        onSubmit={handleChangePassword}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            {/* Current Password */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight="500" mb={1}>
                Current Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword.currentPassword ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                value={values.currentPassword}
                placeholder="Enter your current password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.currentPassword && Boolean(errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("currentPassword")}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword.currentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* New Password */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight="500" mb={1}>
                New Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={values.newPassword}
                placeholder="Enter your new password"
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("newPassword")}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Retype Password */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight="500" mb={1}>
                Re-type New Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword.retypePassword ? "text" : "password"}
                name="retypePassword"
                id="retypePassword"
                value={values.retypePassword}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.retypePassword && Boolean(errors.retypePassword)}
                helperText={touched.retypePassword && errors.retypePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("retypePassword")}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword.retypePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                mt: 2,
                mb: 4,
                width: { xs: "100%", sm: "50%" },
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default AccountChangePasswordForm