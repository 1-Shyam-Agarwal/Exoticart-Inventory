import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"

export default function SetupOrgHeader({
  title = "Setup Organization Profile",
}) {
  const navigate = useNavigate()

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        height: 64,
        px: { xs: 2, sm: 3 },
        bgcolor: "background.main",
      }}
    >
      <IconButton
        type="button"
        aria-label="Close setup and return to organization selection"
        onClick={() => navigate("/")}
        sx={{
          color: "text.secondary",
          "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Typography
        component="h1"
        sx={{
          fontFamily: (theme) => theme.typography.main,
          fontSize: "1rem",
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
