import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { LogoPreview } from "./ImagePreview"
import { LogoUploadPlaceholder } from "./ImagePlaceholder"

export function LogoUpload({ error }) {
  const { setValue, watch } = useFormContext()
  const logoFile = watch("logoFile")

  function generatePreviewUrl(currentLogoFile) {
    if (!(currentLogoFile instanceof File)) return null
    return URL.createObjectURL(currentLogoFile)
  }

  const previewUrl = generatePreviewUrl(logoFile)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 0.5,
          fontSize: "0.75rem",
          fontWeight: 400,
          lineHeight: 1.5,
          color: "text.secondary",
        }}
      >
        Organization Logo
      </Typography>

      <Box
        component="label"
        sx={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          height: 160,
          width: "100%",
          p: 2.5,
          boxSizing: "border-box",
          borderRadius: "0.5rem",
          border: "1px dashed",
          borderColor: error ? "error.main" : "border.main",
          bgcolor: "background.muted",
          cursor: "pointer",
          overflow: "hidden",
          transition: "background-color 150ms ease",
          "&:hover": {
            bgcolor: "rgba(53, 54, 58, 0.9)",
          },
        }}
      >
        <Box
          component="input"
          type="file"
          accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
          onChange={(event) => {
            const file = event.target.files?.[0]
            setValue("logoFile", file ?? undefined)
          }}
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            p: 0,
            m: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        />

        {previewUrl ? <LogoPreview src={previewUrl} /> : <LogoUploadPlaceholder />}
      </Box>

      {error ? (
        <Typography
          sx={{
            mt: 0.5,
            display: "block",
            fontSize: "0.875rem",
            color: "error.main",
          }}
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  )
}
