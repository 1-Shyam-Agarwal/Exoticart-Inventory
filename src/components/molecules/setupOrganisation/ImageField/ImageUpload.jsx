import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { LogoPreview } from "./ImagePreview"
import { LogoUploadPlaceholder } from "./ImagePlaceholder"

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
        return
      }
      reject(new Error("Unable to read file."))
    }
    reader.onerror = () => {
      reject(reader.error ?? new Error("Unable to read file."))
    }
    reader.readAsDataURL(file)
  })
}

export function LogoUpload({
  error,
  name = "logoFile",
  previewName = "logoPreview",
  label = "Organization Logo",
  uploadTitle = "Upload logo",
  helperText = "PNG, JPG, SVG up to 2MB",
}) {
  const { setValue, watch } = useFormContext()
  const previewUrl = watch(previewName)

  async function handleFileChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      setValue(name, undefined, { shouldDirty: true, shouldValidate: true })
      setValue(previewName, null, { shouldDirty: true })
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(file)
      setValue(name, file, { shouldDirty: true, shouldValidate: true })
      setValue(previewName, dataUrl, { shouldDirty: true })
    } catch {
      setValue(name, undefined, { shouldDirty: true, shouldValidate: true })
      setValue(previewName, null, { shouldDirty: true })
    }
  }

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
        {label}
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
            bgcolor: "action.hover",
          },
        }}
      >
        <Box
          component="input"
          type="file"
          accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
          onChange={(event) => {
            void handleFileChange(event)
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

        {previewUrl ? (
          <LogoPreview src={previewUrl} />
        ) : (
          <LogoUploadPlaceholder title={uploadTitle} helperText={helperText} />
        )}
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
