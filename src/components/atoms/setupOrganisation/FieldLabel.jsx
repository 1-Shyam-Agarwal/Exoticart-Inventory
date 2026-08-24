import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

function FieldLabel({ htmlFor, children, required = false, sx }) {
  return (
    <Typography
      variant="caption"
      component="label"
      htmlFor={htmlFor}
      sx={{
        display: "block",
        mb: 0.5,
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.5,
        color: "text.secondary",
        ...sx,
      }}
    >
      {children}
      {required && (
        <Box component="span" sx={{ color: "error.main" }}>
          {" *"}
        </Box>
      )}
    </Typography>
  )
}

export default FieldLabel;