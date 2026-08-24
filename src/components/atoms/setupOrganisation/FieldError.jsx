import Typography from "@mui/material/Typography"

function FieldError({ message }) {
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

export default FieldError ;

