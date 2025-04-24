import { Box, Typography, TextField, Button } from "@mui/material"
import Grid from '@mui/material/Grid2'

const AccountForm = ({ handleChange, handleSubmit, singleUser }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start", gap: 4 }}>
      <Typography variant="h6" mt={10} fontWeight="500">
        Personel Information
      </Typography>

      <Grid container spacing={2} sx={{ width: "100%", maxWidth: "576px" }}>
        {/* First Name */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            First Name
          </Typography>
          <TextField
            fullWidth
            type="text"
            name="firstName"
            id="firstName"
            value={singleUser?.firstName}
            placeholder="Adınızı girin"
            autoComplete="given-name"
            onChange={handleChange}
            size="small"
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            type="text"
            name="lastName"
            id="lastName"
            value={singleUser?.lastName}
            placeholder="Soyadınızı girin"
            autoComplete="family-name"
            onChange={handleChange}
            size="small"
          />
        </Grid>

        {/* Username */}
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            Username
          </Typography>
          <TextField
            fullWidth
            id="userName"
            name="userName"
            type="text"
            value={singleUser?.userName}
            placeholder="Kullanıcı adınızı girin"
            autoComplete="username"
            disabled
            size="small"
            sx={{ bgcolor: "action.disabledBackground" }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            E-mail
          </Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            value={singleUser?.email}
            placeholder="E-posta adresinizi girin"
            autoComplete="email"
            disabled
            size="small"
            sx={{ bgcolor: "action.disabledBackground" }}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            Phone
          </Typography>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            type="tel"
            value={singleUser?.phone}
            placeholder="Telefon numaranızı girin"
            autoComplete="tel"
            onChange={handleChange}
            size="small"
          />
        </Grid>

        {/* Profession */}
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            Profession
          </Typography>
          <TextField
            fullWidth
            id="profession"
            name="profession"
            type="text"
            value={singleUser?.profession}
            placeholder="Mesleğinizi girin"
            autoComplete="organization-title"
            onChange={handleChange}
            size="small"
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight="500" mb={1}>
            Address
          </Typography>
          <TextField
            fullWidth
            id="address"
            name="address"
            type="text"
            value={singleUser?.address}
            placeholder="Adresinizi girin"
            autoComplete="street-address"
            onChange={handleChange}
            multiline
            rows={4}
            size="small"
          />
        </Grid>
      </Grid>

      {/* Update Profile Button */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 6,
          mt: 6,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mb: 4,
            width: { xs: "100%", sm: "50%" },
            borderRadius: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Update Profile
        </Button>
      </Box>
    </Box>
  )
}

export default AccountForm
