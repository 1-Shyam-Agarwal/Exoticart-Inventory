import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import countries from "../../../data/country.json"
import currencies from "../../../data/currency.json"
import states from "../../../data/state.json"
import timezones from "../../../data/timezone.json"
import { locationSchema } from "../../../validation/schema"
import { saveLocation } from "../../../services/organizationDraft"
import FormActions from "./FormNavActions"
import StepLayout from "./StepLayout"
import UnderlineAutocomplete from "./UnderlineAutocomplete"

export default function LocationForm({ defaultValues, draftId, isFirstStep, onBack, onSaved }) {
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(locationSchema),
  })

  const onSubmit = async (values) => {
    try {
      const response = await saveLocation(values, draftId)

      if (response?.success === false) {
        setError("root", {
          type: "server",
          message: response.message ?? "Failed to save location",
        })
        return
      }

      onSaved(response.draft)
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message ?? "Failed to save location",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepLayout title="Location">
        <UnderlineAutocomplete
          name="country"
          control={control}
          errors={errors}
          htmlFor="location-country"
          label="Country"
          required
          options={countries}
          placeholder="Select country"
          rules={{ required: "Country is required" }}
          onChangeExtra={() => {
            setValue("state", "", { shouldDirty: true, shouldValidate: true })
          }}
        />

        <UnderlineAutocomplete
          name="state"
          control={control}
          errors={errors}
          htmlFor="location-state"
          label="State / Union Territory"
          required
          options={states}
          placeholder="Select state / union territory"
          rules={{ required: "State is required" }}
        />

        <UnderlineAutocomplete
          name="currency"
          control={control}
          errors={errors}
          htmlFor="location-currency"
          label="Currency"
          required
          options={currencies}
          placeholder="Select currency"
          rules={{ required: "Currency is required" }}
        />

        <UnderlineAutocomplete
          name="timezone"
          control={control}
          errors={errors}
          htmlFor="location-timezone"
          label="Timezone"
          required
          options={timezones}
          placeholder="Select timezone"
          rules={{ required: "Timezone is required" }}
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
  )
}
