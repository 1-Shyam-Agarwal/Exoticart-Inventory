import { Controller, useFormContext } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import industries from "../../../data/industry.json"
import { LogoUpload } from "./ImageField/ImageUpload"

/** Matches Inventory Management System Organization Identity field styles */
const underlineFieldSx = {
  "& .MuiInputBase-root": {
    height: 40,
    alignItems: "flex-end",
    backgroundColor: "transparent",
    "&:before": {
      borderBottomColor: "border.main",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "border.main",
    },
    "&:after": {
      borderBottomWidth: 1,
      borderBottomColor: "primary.main",
    },
  },
  "& .MuiInputBase-input": {
    px: 0,
    py: 1,
    fontSize: "0.875rem",
    color: "text.primary",
    "&::placeholder": {
      color: "text.secondary",
      opacity: 1,
    },
  },
}

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

export default function StepOrganizationIdentity() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography
        component="h2"
        sx={{
          mb: 4,
          fontFamily: (theme) => theme.typography.main,
          fontSize: "1.875rem",
          fontWeight: 400,
          lineHeight: 1.2,
          color: "text.primary",
        }}
      >
        Organization Identity
      </Typography>

      <Stack spacing={4}>
        <LogoUpload error={errors.logoFile?.message} />

        <Box>
          <FieldLabel htmlFor="organization-name" required>
            Organization Name
          </FieldLabel>
          <TextField
            id="organization-name"
            fullWidth
            variant="standard"
            placeholder="Acme Technologies Pvt Ltd"
            error={Boolean(errors.name)}
            sx={underlineFieldSx}
            {...register("name", {
              required: "Organization name is required",
              minLength: {
                value: 2,
                message: "Organization name must be at least 2 characters",
              },
            })}
          />
          <FieldError message={errors.name?.message} />
        </Box>

        <Box>
          <FieldLabel htmlFor="organization-industry" required>
            Industry
          </FieldLabel>

          <Controller
            name="industry"
            control={control}
            rules={{ required: "Industry is required" }}
            render={({ field: { onChange, value, ref } }) => (
              <Autocomplete
                id="organization-industry"
                options={industries}
                value={value || null}
                onChange={(_, newValue) => onChange(newValue ?? "")}
                autoHighlight
                openOnFocus
                slotProps={{
                  paper: {
                    sx: {
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "border.main",
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={ref}
                    variant="standard"
                    placeholder="Select industry"
                    error={Boolean(errors.industry)}
                    sx={underlineFieldSx}
                  />
                )}
              />
            )}
          />
          <FieldError message={errors.industry?.message} />
        </Box>
      </Stack>
    </Box>
  )
}
