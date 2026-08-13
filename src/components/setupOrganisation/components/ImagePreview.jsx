import Box from "@mui/material/Box"

export function LogoPreview({ src, alt = "Organization logo preview" }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{ maxHeight: 96, maxWidth: "100%", objectFit: "contain" }}
    />
  )
}
