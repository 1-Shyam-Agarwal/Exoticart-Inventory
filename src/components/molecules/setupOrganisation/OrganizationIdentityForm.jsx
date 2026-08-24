import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextField from "@mui/material/TextField"
import industries from "../../../data/industry.json"
import { organizationIdentitySchema } from "../../../validation/schema"
import { saveOrganizationIdentity } from "../../../services/organizationDraft"
import FormActions from "./FormNavActions"
import FormField from "./FormField"
import { LogoUpload } from "./ImageUpload"
import StepLayout from "./StepLayout"
import UnderlineAutocomplete from "./UnderlineAutocomplete"
import { underlineFieldSx } from "./styles"

export default function OrganizationIdentityForm({ defaultValues, draftId, isFirstStep, onBack, onSaved }) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(organizationIdentitySchema),
  })

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values) => {
    try {
      const response = await saveOrganizationIdentity(values, draftId)

      if (response?.success === false) {
        setError("root", {
          type: "server",
          message: response.message ?? "Failed to save organization identity",
        })
        return
      }

      onSaved({
        ...response.draft,
        data: { ...response.draft.data, logoPreview: values.logoPreview },
      })
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message ?? "Failed to save organization identity",
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <FormActions
          isFirstStep={isFirstStep}
          isLastStep={false}
          isSubmitting={isSubmitting}
          onBack={onBack}
          submitError={errors.root?.message}
        />
      </form>
    </FormProvider>
  )
}
