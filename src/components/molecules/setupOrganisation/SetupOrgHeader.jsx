import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CloseIcon from "@mui/icons-material/Close"

export default function SetupOrgHeader({
  title,
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
      }}
    >
      <IconButton
        type="button"
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
