import Typography from "@mui/material/Typography"

export function FieldError({ message }) {
  if (!message) return null

  return (
    <Typography
      role="alert"
      sx={{
        mt: 0.5,
        fontSize: "0.875rem",
        fontWeight: 400,
        color: "error.main",
      }}
    >
      {message}
    </Typography>
  )
}
