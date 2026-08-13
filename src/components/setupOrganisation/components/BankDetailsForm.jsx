import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import FormField from "./FormField"
import { LogoUpload } from "./ImageUpload"
import StepLayout from "./StepLayout"
import {
  autocompletePaperSx,
  linkButtonSx,
  stepTitleSx,
  underlineFieldSx,
} from "./styles"

const ACCOUNT_TYPES = [
  { value: "savings", label: "Savings" },
  { value: "current", label: "Current" },
]

function hasUpiDetails(values) {
  return Boolean(values?.upiId?.trim() || values?.qrFile)
}

export default function BankDetailsForm() {
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

  const handleHideUpiDetails = () => {
    setShowUpiDetails(false)
    setValue("upiId", "")
    setValue("qrFile", undefined)
    setValue("qrPreview", null)
    clearErrors(["upiId", "qrFile"])
  }

  return (
    <StepLayout title="Bank Details">
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <FormField
          htmlFor="account-holder-name"
          label="Account Holder Name"
          required
          error={errors.accountHolderName?.message}
        >
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
        </FormField>

        <FormField
          htmlFor="bank-name"
          label="Bank Name"
          required
          error={errors.bankName?.message}
        >
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
        </FormField>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <FormField
          htmlFor="account-number"
          label="Account Number"
          required
          error={errors.accountNumber?.message}
        >
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
        </FormField>

        <FormField
          htmlFor="ifsc-code"
          label="IFSC Code"
          required
          error={errors.ifscCode?.message}
        >
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
        </FormField>
      </Box>

      <FormField
        htmlFor="account-type"
        label="Account Type"
        required
        error={errors.accountType?.message}
      >
        <Controller
          name="accountType"
          control={control}
          rules={{ required: "Account type is required" }}
          render={({ field: { onChange, value, ref } }) => (
            <Autocomplete
              id="account-type"
              options={ACCOUNT_TYPES}
              value={ACCOUNT_TYPES.find((item) => item.value === value) || null}
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
      </FormField>

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
            <Button
              type="button"
              onClick={handleHideUpiDetails}
              sx={linkButtonSx}
            >
              Hide
            </Button>
          </Stack>

          <FormField
            htmlFor="upi-id"
            label="UPI ID"
            error={errors.upiId?.message}
          >
            <TextField
              id="upi-id"
              fullWidth
              variant="standard"
              placeholder="name@upi"
              error={Boolean(errors.upiId)}
              sx={underlineFieldSx}
              {...register("upiId")}
            />
          </FormField>

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
    </StepLayout>
  )
}
