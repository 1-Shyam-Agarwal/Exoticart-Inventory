import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { FormGrid } from "./styles"

function FieldLabel({ htmlFor, children, required = false }) {
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
      }}
    >
      {children}
      {required ? (
        <Box component="span" sx={{ color: "error.main" }}>
          {" *"}
        </Box>
      ) : null}
    </Typography>
  )
}

function FieldError({ message }) {
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

/** Label + control + error, modeled after checkout FormGrid fields */
export default function FormField({
  htmlFor,
  label,
  required = false,
  error,
  children,
  sx,
}) {
  return (
    <FormGrid sx={sx}>
      {label ? (
        <FieldLabel htmlFor={htmlFor} required={required}>
          {label}
        </FieldLabel>
      ) : null}
      {children}
      <FieldError message={error} />
    </FormGrid>
  )
}
