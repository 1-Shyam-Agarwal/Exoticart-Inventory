import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import industries from "../../../data/industry.json"
import { FieldError } from "./FieldError"
import { FieldLabel } from "./FieldLabel"
import { LogoUpload } from "./ImageField/ImageUpload"
import { UnderlineAutocomplete } from "./UnderlineAutocomplete"
import { stepTitleSx, underlineFieldSx } from "./fieldStyles"

export default function StepOrganizationIdentity() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography component="h2" sx={stepTitleSx}>
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

        <UnderlineAutocomplete
          name="industry"
          control={control}
          errors={errors}
          htmlFor="organization-industry"
          label="Industry"
          required
          options={industries}
          placeholder="Select industry"
          rules={{ required: "Industry is required" }}
        />
      </Stack>
    </Box>
  )
}
