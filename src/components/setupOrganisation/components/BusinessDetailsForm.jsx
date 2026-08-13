import { Controller, useFormContext } from "react-hook-form"
import TextField from "@mui/material/TextField"
import fiscalYears from "../../../data/fiscalYear.json"
import FormField from "./FormField"
import StepLayout from "./StepLayout"
import UnderlineAutocomplete from "./UnderlineAutocomplete"
import { underlineFieldSx } from "./styles"

function toDateInputValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return ""
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function BusinessDetailsForm() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  return (
    <StepLayout title="Business Details">
      <FormField
        htmlFor="inventory-start-date"
        label="Inventory Start Date"
        required
        error={errors.inventoryStartDate?.message}
      >
        <Controller
          name="inventoryStartDate"
          control={control}
          rules={{ required: "Inventory start date is required" }}
          render={({ field }) => (
            <TextField
              id="inventory-start-date"
              fullWidth
              type="date"
              variant="standard"
              error={Boolean(errors.inventoryStartDate)}
              sx={underlineFieldSx}
              value={toDateInputValue(field.value)}
              onChange={(event) => {
                const next = event.target.value
                field.onChange(next ? new Date(`${next}T00:00:00`) : undefined)
              }}
              slotProps={{
                htmlInput: {
                  max: toDateInputValue(new Date()),
                },
              }}
            />
          )}
        />
      </FormField>

      <UnderlineAutocomplete
        name="fiscalYear"
        control={control}
        errors={errors}
        htmlFor="fiscal-year"
        label="Fiscal Year"
        required
        options={fiscalYears}
        placeholder="Select fiscal year"
        rules={{ required: "Fiscal year is required" }}
      />

      <FormField htmlFor="pan" label="PAN" error={errors.pan?.message}>
        <TextField
          id="pan"
          fullWidth
          variant="standard"
          placeholder="ABCDE1234F"
          inputProps={{ maxLength: 10 }}
          error={Boolean(errors.pan)}
          sx={underlineFieldSx}
          {...register("pan", {
            onChange: (event) => {
              setValue("pan", event.target.value.toUpperCase(), {
                shouldDirty: true,
                shouldValidate: true,
              })
            },
          })}
        />
      </FormField>

      <FormField htmlFor="gst" label="GST" error={errors.gst?.message}>
        <TextField
          id="gst"
          fullWidth
          variant="standard"
          placeholder="22AAAAA0000A1Z5"
          inputProps={{ maxLength: 15 }}
          error={Boolean(errors.gst)}
          sx={underlineFieldSx}
          {...register("gst", {
            onChange: (event) => {
              setValue("gst", event.target.value.toUpperCase(), {
                shouldDirty: true,
                shouldValidate: true,
              })
            },
          })}
        />
      </FormField>
    </StepLayout>
  )
}
