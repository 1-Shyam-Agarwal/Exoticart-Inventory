import Box from "@mui/material/Box"
import FieldError from '../../atoms/setupOrganisation/FieldError';
import FieldLabel from '../../atoms/setupOrganisation/FieldLabel';

export default function FormField({
  htmlFor,
  label,
  labelSx,
  required = false,
  error,
  children,
  sx,
}) {
  return (
    <Box sx={sx}>
      {label && (
        <FieldLabel htmlFor={htmlFor} required={required} sx={labelSx}>
          {label}
        </FieldLabel>
      )}
      {children}
      {error && <FieldError message={error} />}
    </Box>
  )
}
