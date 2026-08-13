import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"

export function LogoUploadPlaceholder() {
  return (
    <Box
      sx={{
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        rowGap: 0.75,
        width: "fit-content",
        maxWidth: "100%",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          display: "grid",
          placeItems: "center",
          lineHeight: 0,
        }}
      >
        <CloudUploadOutlinedIcon
          sx={{
            fontSize: 28,
            color: "text.secondary",
            display: "block",
          }}
        />
      </Box>

      <Typography
        sx={{
          m: 0,
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: 1.25,
          color: "text.primary",
          textAlign: "center",
        }}
      >
        Upload logo
      </Typography>

      <Typography
        sx={{
          m: 0,
          fontSize: "0.75rem",
          fontWeight: 400,
          lineHeight: 1.4,
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        PNG, JPG, SVG up to 2MB
      </Typography>
    </Box>
  )
}
