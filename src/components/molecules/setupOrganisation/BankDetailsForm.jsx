import { useState } from "react"
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import Autocomplete from "@mui/material/Autocomplete"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { bankDetailsSchema } from "../../../validation/schema"
import { saveBankDetails } from "../../../services/organizationDraft"
import FormActions from "./FormNavActions"
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

function hasUpiDetails(account) {
  return Boolean(account?.upiId?.trim() || account?.qrFile)
}

function BankAccountCard({
  accountIndex,
  multipleAccounts,
  canRemoveAccount,
  onRemoveAccount,
}) {
  const {
    register,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const [showUpiDetails, setShowUpiDetails] = useState(() =>
    hasUpiDetails(getValues(`bankAccounts.${accountIndex}`)),
  )

  const accountErrors = errors.bankAccounts?.[accountIndex]

  const handleHideUpiDetails = () => {
    setShowUpiDetails(false)
    setValue(`bankAccounts.${accountIndex}.upiId`, "")
    setValue(`bankAccounts.${accountIndex}.qrFile`, undefined)
    setValue(`bankAccounts.${accountIndex}.qrPreview`, null)
    clearErrors([
      `bankAccounts.${accountIndex}.upiId`,
      `bankAccounts.${accountIndex}.qrFile`,
    ])
  }

  return (
    <Box
      sx={
        multipleAccounts
          ? {
              p: 3,
              border: "1px solid",
              borderColor: "border.main",
              borderRadius: 1,
            }
          : undefined
      }
    >
      {(multipleAccounts || canRemoveAccount) && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ ...stepTitleSx, mb: 0, fontSize: "1.125rem" }}>
            Bank Account {accountIndex + 1}
          </Typography>
          {canRemoveAccount && (
            <IconButton
              type="button"
              size="small"
              onClick={onRemoveAccount}
              aria-label="Remove bank account"
              sx={{ color: "error.main" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      )}

      <Stack spacing={4}>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          }}
        >
          <FormField
            htmlFor={`account-holder-name-${accountIndex}`}
            label="Account Holder Name"
            required
            error={accountErrors?.accountHolderName?.message}
          >
            <TextField
              id={`account-holder-name-${accountIndex}`}
              fullWidth
              variant="standard"
              placeholder="Enter account holder name"
              error={Boolean(accountErrors?.accountHolderName)}
              sx={underlineFieldSx}
              {...register(`bankAccounts.${accountIndex}.accountHolderName`, {
                required: "Account holder name is required",
                minLength: {
                  value: 2,
                  message: "Account holder name must be at least 2 characters",
                },
              })}
            />
          </FormField>

          <FormField
            htmlFor={`bank-name-${accountIndex}`}
            label="Bank Name"
            required
            error={accountErrors?.bankName?.message}
          >
            <TextField
              id={`bank-name-${accountIndex}`}
              fullWidth
              variant="standard"
              placeholder="Enter bank name"
              error={Boolean(accountErrors?.bankName)}
              sx={underlineFieldSx}
              {...register(`bankAccounts.${accountIndex}.bankName`, {
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
            htmlFor={`account-number-${accountIndex}`}
            label="Account Number"
            required
            error={accountErrors?.accountNumber?.message}
          >
            <TextField
              id={`account-number-${accountIndex}`}
              fullWidth
              variant="standard"
              placeholder="Enter account number"
              inputMode="numeric"
              error={Boolean(accountErrors?.accountNumber)}
              sx={underlineFieldSx}
              {...register(`bankAccounts.${accountIndex}.accountNumber`, {
                required: "Account number is required",
                minLength: {
                  value: 9,
                  message: "Should have at least 9 characters",
                },
              })}
            />
          </FormField>

          <FormField
            htmlFor={`ifsc-code-${accountIndex}`}
            label="IFSC Code"
            required
            error={accountErrors?.ifscCode?.message}
          >
            <TextField
              id={`ifsc-code-${accountIndex}`}
              fullWidth
              variant="standard"
              placeholder="SBIN0001234"
              inputProps={{ maxLength: 11 }}
              error={Boolean(accountErrors?.ifscCode)}
              sx={underlineFieldSx}
              {...register(`bankAccounts.${accountIndex}.ifscCode`, {
                required: "IFSC code is required",
                minLength: {
                  value: 11,
                  message: "Should have at least 11 characters",
                },
                onChange: (event) => {
                  setValue(
                    `bankAccounts.${accountIndex}.ifscCode`,
                    event.target.value.toUpperCase(),
                    { shouldDirty: true, shouldValidate: true },
                  )
                },
              })}
            />
          </FormField>
        </Box>

        <FormField
          htmlFor={`account-type-${accountIndex}`}
          label="Account Type"
          required
          error={accountErrors?.accountType?.message}
        >
          <Controller
            name={`bankAccounts.${accountIndex}.accountType`}
            control={control}
            rules={{ required: "Account type is required" }}
            render={({ field: { onChange, value, ref } }) => (
              <Autocomplete
                id={`account-type-${accountIndex}`}
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
                    error={Boolean(accountErrors?.accountType)}
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
              htmlFor={`upi-id-${accountIndex}`}
              label="UPI ID"
              error={accountErrors?.upiId?.message}
            >
              <TextField
                id={`upi-id-${accountIndex}`}
                fullWidth
                variant="standard"
                placeholder="name@upi"
                error={Boolean(accountErrors?.upiId)}
                sx={underlineFieldSx}
                {...register(`bankAccounts.${accountIndex}.upiId`)}
              />
            </FormField>

            <LogoUpload
              name={`bankAccounts.${accountIndex}.qrFile`}
              previewName={`bankAccounts.${accountIndex}.qrPreview`}
              label="QR Code Upload"
              uploadTitle="Upload QR code"
              helperText="PNG, JPG, SVG up to 2MB"
              error={accountErrors?.qrFile?.message}
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

export default function BankDetailsForm({ defaultValues, draftId, isFirstStep, onBack, onSaved }) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(bankDetailsSchema),
  })

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form

  const {
    fields: accountFields,
    append: appendAccount,
    remove: removeAccount,
  } = useFieldArray({ control, name: "bankAccounts" })

  const accountsError =
    typeof errors.bankAccounts?.message === "string"
      ? errors.bankAccounts.message
      : undefined

  const onSubmit = async (values) => {
    try {
      const response = await saveBankDetails(values, draftId)

      if (response?.success === false) {
        setError("root", {
          type: "server",
          message: response.message ?? "Failed to save bank details",
        })
        return
      }

      onSaved({
        ...response.draft,
        data: {
          ...response.draft.data,
          bankAccounts: response.draft.data.bankAccounts.map((account, index) => ({
            ...account,
            qrPreview: values.bankAccounts[index]?.qrPreview,
          })),
        },
      })
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message ?? "Failed to save bank details",
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StepLayout>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h2" sx={{ ...stepTitleSx, mb: 0 }}>
              Bank Details
            </Typography>
            <IconButton
              type="button"
              size="small"
              onClick={() =>
                appendAccount({
                  accountHolderName: "",
                  bankName: "",
                  accountNumber: "",
                  ifscCode: "",
                  accountType: "",
                  upiId: "",
                  qrFile: undefined,
                  qrPreview: null,
                })
              }
              aria-label="Add another bank account"
              sx={{ color: "primary.main", alignItems: "center" }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>

          {accountsError && (
            <Typography
              role="alert"
              sx={{ fontSize: "0.875rem", fontWeight: 400, color: "error.main" }}
            >
              {accountsError}
            </Typography>
          )}

          <Stack spacing={4}>
            {accountFields.map((accountField, accountIndex) => (
              <BankAccountCard
                key={accountField.id}
                accountIndex={accountIndex}
                multipleAccounts={accountFields.length > 1}
                canRemoveAccount={accountFields.length > 1}
                onRemoveAccount={() => removeAccount(accountIndex)}
              />
            ))}
          </Stack>
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
