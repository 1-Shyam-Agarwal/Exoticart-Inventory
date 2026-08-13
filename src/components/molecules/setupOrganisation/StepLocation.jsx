import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import countries from "../../../data/country.json"
import currencies from "../../../data/currency.json"
import states from "../../../data/state.json"
import timezones from "../../../data/timezone.json"
import { FieldError } from "./FieldError"
import { FieldLabel } from "./FieldLabel"
import { UnderlineAutocomplete } from "./UnderlineAutocomplete"
import { linkButtonSx, stepTitleSx, underlineFieldSx } from "./fieldStyles"

function hasAddress(values) {
  return Boolean(
    values?.street1?.trim() ||
      values?.street2?.trim() ||
      values?.city?.trim() ||
      values?.postalCode?.trim(),
  )
}

export default function StepLocation() {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  const [showAddress, setShowAddress] = useState(() => hasAddress(getValues()))

  function hideAddress() {
    setShowAddress(false)
    setValue("street1", "")
    setValue("street2", "")
    setValue("city", "")
    setValue("postalCode", "")
  }

  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography component="h2" sx={stepTitleSx}>
        Location
      </Typography>

      <Stack spacing={4}>
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
              <Button type="button" onClick={hideAddress} sx={linkButtonSx}>
                Hide
              </Button>
            </Stack>

            <Box>
              <FieldLabel htmlFor="street-1">Street 1</FieldLabel>
              <TextField
                id="street-1"
                fullWidth
                variant="standard"
                placeholder="Building, street"
                error={Boolean(errors.street1)}
                sx={underlineFieldSx}
                {...register("street1")}
              />
              <FieldError message={errors.street1?.message} />
            </Box>

            <Box>
              <FieldLabel htmlFor="street-2">Street 2</FieldLabel>
              <TextField
                id="street-2"
                fullWidth
                variant="standard"
                placeholder="Area, landmark"
                error={Boolean(errors.street2)}
                sx={underlineFieldSx}
                {...register("street2")}
              />
              <FieldError message={errors.street2?.message} />
            </Box>

            <Box>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <TextField
                id="city"
                fullWidth
                variant="standard"
                placeholder="City"
                error={Boolean(errors.city)}
                sx={underlineFieldSx}
                {...register("city")}
              />
              <FieldError message={errors.city?.message} />
            </Box>

            <Box>
              <FieldLabel htmlFor="postal-code">ZIP / Postal Code</FieldLabel>
              <TextField
                id="postal-code"
                fullWidth
                variant="standard"
                placeholder="Postal code"
                error={Boolean(errors.postalCode)}
                sx={underlineFieldSx}
                {...register("postalCode")}
              />
              <FieldError message={errors.postalCode?.message} />
            </Box>
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
      </Stack>
    </Box>
  )
}
