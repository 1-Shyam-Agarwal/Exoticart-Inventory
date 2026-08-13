import { Controller, useFormContext } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import countryCodes from "../../../data/countryCodes.json"
import { FieldError } from "./FieldError"
import { FieldLabel } from "./FieldLabel"
import {
  autocompletePaperSx,
  stepTitleSx,
  underlineFieldSx,
} from "./fieldStyles"

export default function StepOwnerDetails() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography component="h2" sx={stepTitleSx}>
        Owner Details
      </Typography>

      <Stack spacing={4}>
        <Box>
          <FieldLabel htmlFor="owner-name" required>
            Owner Name
          </FieldLabel>
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
          <FieldError message={errors.ownerName?.message} />
        </Box>

        <Box>
          <FieldLabel htmlFor="mobile-number" required>
            Mobile Number
          </FieldLabel>
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
          <FieldError
            message={
              errors.mobileNumber?.message || errors.countryCode?.message
            }
          />
        </Box>

        <Box>
          <FieldLabel htmlFor="owner-email" required>
            Email Address
          </FieldLabel>
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
          <FieldError message={errors.email?.message} />
        </Box>
      </Stack>
    </Box>
  )
}
