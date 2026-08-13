import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import countries from "../../../data/country.json"
import currencies from "../../../data/currency.json"
import states from "../../../data/state.json"
import timezones from "../../../data/timezone.json"
import FormField from "./FormField"
import StepLayout from "./StepLayout"
import UnderlineAutocomplete from "./UnderlineAutocomplete"
import { linkButtonSx, stepTitleSx, underlineFieldSx } from "./styles"

function hasAddress(values) {
  return Boolean(
    values?.street1?.trim() ||
      values?.street2?.trim() ||
      values?.city?.trim() ||
      values?.postalCode?.trim(),
  )
}

export default function LocationForm() {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  const [showAddress, setShowAddress] = useState(() => hasAddress(getValues()))

  const handleHideAddress = () => {
    setShowAddress(false)
    setValue("street1", "")
    setValue("street2", "")
    setValue("city", "")
    setValue("postalCode", "")
  }

  return (
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

      {showAddress ? (
        <Stack spacing={4}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography component="h3" sx={{ ...stepTitleSx, mb: 0 }}>
              Address
            </Typography>
            <Button type="button" onClick={handleHideAddress} sx={linkButtonSx}>
              Hide
            </Button>
          </Stack>

          <FormField
            htmlFor="street-1"
            label="Street 1"
            error={errors.street1?.message}
          >
            <TextField
              id="street-1"
              fullWidth
              variant="standard"
              placeholder="Building, street"
              error={Boolean(errors.street1)}
              sx={underlineFieldSx}
              {...register("street1")}
            />
          </FormField>

          <FormField
            htmlFor="street-2"
            label="Street 2"
            error={errors.street2?.message}
          >
            <TextField
              id="street-2"
              fullWidth
              variant="standard"
              placeholder="Area, landmark"
              error={Boolean(errors.street2)}
              sx={underlineFieldSx}
              {...register("street2")}
            />
          </FormField>

          <FormField htmlFor="city" label="City" error={errors.city?.message}>
            <TextField
              id="city"
              fullWidth
              variant="standard"
              placeholder="City"
              error={Boolean(errors.city)}
              sx={underlineFieldSx}
              {...register("city")}
            />
          </FormField>

          <FormField
            htmlFor="postal-code"
            label="ZIP / Postal Code"
            error={errors.postalCode?.message}
          >
            <TextField
              id="postal-code"
              fullWidth
              variant="standard"
              placeholder="Postal code"
              error={Boolean(errors.postalCode)}
              sx={underlineFieldSx}
              {...register("postalCode")}
            />
          </FormField>
        </Stack>
      ) : (
        <Button
          type="button"
          onClick={() => setShowAddress(true)}
          sx={linkButtonSx}
        >
          + Add address
        </Button>
      )}
    </StepLayout>
  )
}
