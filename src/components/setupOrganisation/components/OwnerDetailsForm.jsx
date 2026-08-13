import { Controller, useFormContext } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import countryCodes from "../../../data/countryCodes.json"
import FormField from "./FormField"
import StepLayout from "./StepLayout"
import { autocompletePaperSx, underlineFieldSx } from "./styles"

export default function OwnerDetailsForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <StepLayout title="Owner Details">
      <FormField
        htmlFor="owner-name"
        label="Owner Name"
        required
        error={errors.ownerName?.message}
      >
        <TextField
          id="owner-name"
          fullWidth
          variant="standard"
          placeholder="Enter owner name"
          error={Boolean(errors.ownerName)}
          sx={underlineFieldSx}
          {...register("ownerName", {
            required: "Owner name is required",
            minLength: {
              value: 2,
              message: "Owner name must be at least 2 characters",
            },
          })}
        />
      </FormField>

      <FormField
        htmlFor="mobile-number"
        label="Mobile Number"
        required
        error={errors.mobileNumber?.message || errors.countryCode?.message}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-end">
          <Box sx={{ width: 120, flexShrink: 0 }}>
            <Controller
              name="countryCode"
              control={control}
              rules={{ required: "Country code is required" }}
              render={({ field: { onChange, value, ref } }) => (
                <Autocomplete
                  options={countryCodes}
                  value={
                    countryCodes.find((item) => item.code === value) || null
                  }
                  onChange={(_, newValue) => onChange(newValue?.code ?? "")}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, selected) =>
                    option.code === selected.code
                  }
                  disableClearable
                  openOnFocus
                  slotProps={{
                    paper: { sx: autocompletePaperSx },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputRef={ref}
                      variant="standard"
                      error={Boolean(errors.countryCode)}
                      sx={underlineFieldSx}
                    />
                  )}
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              id="mobile-number"
              fullWidth
              variant="standard"
              placeholder="9876543210"
              inputMode="numeric"
              error={Boolean(errors.mobileNumber)}
              sx={underlineFieldSx}
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
            />
          </Box>
        </Stack>
      </FormField>

      <FormField
        htmlFor="owner-email"
        label="Email Address"
        required
        error={errors.email?.message}
      >
        <TextField
          id="owner-email"
          fullWidth
          type="email"
          variant="standard"
          placeholder="owner@company.com"
          error={Boolean(errors.email)}
          sx={underlineFieldSx}
          {...register("email", {
            required: "Email address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
      </FormField>
    </StepLayout>
  )
}
