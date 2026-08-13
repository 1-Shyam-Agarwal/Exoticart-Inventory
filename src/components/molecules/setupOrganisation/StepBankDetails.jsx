import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { FieldError } from "./FieldError"
import { FieldLabel } from "./FieldLabel"
import { LogoUpload } from "./ImageField/ImageUpload"
import {
  autocompletePaperSx,
  linkButtonSx,
  stepTitleSx,
  underlineFieldSx,
} from "./fieldStyles"

const ACCOUNT_TYPES = [
  { value: "savings", label: "Savings" },
  { value: "current", label: "Current" },
]

function hasUpiDetails(values) {
  return Boolean(values?.upiId?.trim() || values?.qrFile)
}

export default function StepBankDetails() {
  const {
    register,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const [showUpiDetails, setShowUpiDetails] = useState(() =>
    hasUpiDetails(getValues()),
  )

  function hideUpiDetails() {
    setShowUpiDetails(false)
    setValue("upiId", "")
    setValue("qrFile", undefined)
    setValue("qrPreview", null)
    clearErrors(["upiId", "qrFile"])
  }

  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography component="h2" sx={stepTitleSx}>
        Bank Details
      </Typography>

      <Stack spacing={4}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, sm: 4 },
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          <Box>
            <FieldLabel htmlFor="account-holder-name" required>
              Account Holder Name
            </FieldLabel>
            <TextField
              id="account-holder-name"
              fullWidth
              variant="standard"
              placeholder="Enter account holder name"
              error={Boolean(errors.accountHolderName)}
              sx={underlineFieldSx}
              {...register("accountHolderName", {
                required: "Account holder name is required",
                minLength: {
                  value: 2,
                  message: "Account holder name must be at least 2 characters",
                },
              })}
            />
            <FieldError message={errors.accountHolderName?.message} />
          </Box>

          <Box>
            <FieldLabel htmlFor="bank-name" required>
              Bank Name
            </FieldLabel>
            <TextField
              id="bank-name"
              fullWidth
              variant="standard"
              placeholder="Enter bank name"
              error={Boolean(errors.bankName)}
              sx={underlineFieldSx}
              {...register("bankName", {
                required: "Bank name is required",
                minLength: {
                  value: 2,
                  message: "Bank name must be at least 2 characters",
                },
              })}
            />
            <FieldError message={errors.bankName?.message} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, sm: 4 },
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          <Box>
            <FieldLabel htmlFor="account-number" required>
              Account Number
            </FieldLabel>
            <TextField
              id="account-number"
              fullWidth
              variant="standard"
              placeholder="Enter account number"
              inputMode="numeric"
              error={Boolean(errors.accountNumber)}
              sx={underlineFieldSx}
              {...register("accountNumber", {
                required: "Account number is required",
                minLength: {
                  value: 9,
                  message: "Should have at least 9 characters",
                },
              })}
            />
            <FieldError message={errors.accountNumber?.message} />
          </Box>

          <Box>
            <FieldLabel htmlFor="ifsc-code" required>
              IFSC Code
            </FieldLabel>
            <TextField
              id="ifsc-code"
              fullWidth
              variant="standard"
              placeholder="SBIN0001234"
              inputProps={{ maxLength: 11 }}
              error={Boolean(errors.ifscCode)}
              sx={underlineFieldSx}
              {...register("ifscCode", {
                required: "IFSC code is required",
                minLength: {
                  value: 11,
                  message: "Should have at least 11 characters",
                },
                onChange: (event) => {
                  setValue("ifscCode", event.target.value.toUpperCase(), {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                },
              })}
            />
            <FieldError message={errors.ifscCode?.message} />
          </Box>
        </Box>

        <Box>
          <FieldLabel htmlFor="account-type" required>
            Account Type
          </FieldLabel>
          <Controller
            name="accountType"
            control={control}
            rules={{ required: "Account type is required" }}
            render={({ field: { onChange, value, ref } }) => (
              <Autocomplete
                id="account-type"
                options={ACCOUNT_TYPES}
                value={
                  ACCOUNT_TYPES.find((item) => item.value === value) || null
                }
                onChange={(_, newValue) => onChange(newValue?.value ?? "")}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, selected) =>
                  option.value === selected.value
                }
                openOnFocus
                slotProps={{
                  paper: { sx: autocompletePaperSx },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={ref}
                    variant="standard"
                    placeholder="Select account type"
                    error={Boolean(errors.accountType)}
                    sx={underlineFieldSx}
                  />
                )}
              />
            )}
          />
          <FieldError message={errors.accountType?.message} />
        </Box>

        {showUpiDetails ? (
          <Stack spacing={4}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography component="h3" sx={{ ...stepTitleSx, mb: 0 }}>
                UPI Details
              </Typography>
              <Button type="button" onClick={hideUpiDetails} sx={linkButtonSx}>
                Hide
              </Button>
            </Stack>

            <Box>
              <FieldLabel htmlFor="upi-id">UPI ID</FieldLabel>
              <TextField
                id="upi-id"
                fullWidth
                variant="standard"
                placeholder="name@upi"
                error={Boolean(errors.upiId)}
                sx={underlineFieldSx}
                {...register("upiId")}
              />
              <FieldError message={errors.upiId?.message} />
            </Box>

            <LogoUpload
              name="qrFile"
              previewName="qrPreview"
              label="QR Code Upload"
              uploadTitle="Upload QR code"
              helperText="PNG, JPG, SVG up to 2MB"
              error={errors.qrFile?.message}
            />
          </Stack>
        ) : (
          <Button
            type="button"
            onClick={() => setShowUpiDetails(true)}
            sx={linkButtonSx}
          >
            + Add UPI details
          </Button>
        )}
      </Stack>
    </Box>
  )
}
