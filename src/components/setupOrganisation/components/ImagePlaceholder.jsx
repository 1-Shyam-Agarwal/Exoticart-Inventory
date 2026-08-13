import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"

export function LogoUploadPlaceholder({
  title = "Upload logo",
  helperText = "PNG, JPG, SVG up to 2MB",
}) {
  return (
    <Stack spacing={1} alignItems="center">
      <CloudUploadOutlinedIcon
        sx={{ fontSize: 28, color: "text.secondary" }}
      />
      <Typography
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: 1.25,
          color: "text.primary",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 400,
          color: "text.secondary",
        }}
      >
        {helperText}
      </Typography>
    </Stack>
  )
}
