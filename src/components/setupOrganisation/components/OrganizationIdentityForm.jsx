import { useFormContext } from "react-hook-form"
import TextField from "@mui/material/TextField"
import industries from "../../../data/industry.json"
import FormField from "./FormField"
import { LogoUpload } from "./ImageUpload"
import StepLayout from "./StepLayout"
import UnderlineAutocomplete from "./UnderlineAutocomplete"
import { underlineFieldSx } from "./styles"

export default function OrganizationIdentityForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <StepLayout title="Organization Identity">
      <LogoUpload error={errors.logoFile?.message} />

      <FormField
        htmlFor="organization-name"
        label="Organization Name"
        required
        error={errors.name?.message}
      >
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
      </FormField>

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
    </StepLayout>
  )
}
