import { Controller, useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import fiscalYears from "../../../data/fiscalYear.json"
import { FieldError } from "./FieldError"
import { FieldLabel } from "./FieldLabel"
import { UnderlineAutocomplete } from "./UnderlineAutocomplete"
import { stepTitleSx, underlineFieldSx } from "./fieldStyles"

function toDateInputValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return ""
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function StepBusinessDetails() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography component="h2" sx={stepTitleSx}>
        Business Details
      </Typography>

      <Stack spacing={4}>
        <Box>
          <FieldLabel htmlFor="inventory-start-date" required>
            Inventory Start Date
          </FieldLabel>
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
          <FieldError message={errors.inventoryStartDate?.message} />
        </Box>

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

        <Box>
          <FieldLabel htmlFor="pan">PAN</FieldLabel>
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
          <FieldError message={errors.pan?.message} />
        </Box>

        <Box>
          <FieldLabel htmlFor="gst">GST</FieldLabel>
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
          <FieldError message={errors.gst?.message} />
        </Box>
      </Stack>
    </Box>
  )
}
