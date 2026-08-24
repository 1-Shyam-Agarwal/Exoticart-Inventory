import { Fragment } from "react"
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
import countryCodes from "../../../data/countryCodes.json"
import { ownerDetailsSchema } from "../../../validation/schema"
import { saveOwnerDetails } from "../../../services/organizationDraft"
import FormActions from "./FormNavActions"
import FormField from "./FormField"
import StepLayout from "./StepLayout"
import {
  autocompletePaperSx,
  linkButtonSx,
  stepTitleSx,
  underlineFieldSx,
} from "./styles"

function OwnerCard({ ownerIndex, multipleOwners, canRemoveOwner, onRemoveOwner }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const {
    fields: numberFields,
    append: appendNumber,
    remove: removeNumber,
  } = useFieldArray({ control, name: `owners.${ownerIndex}.numbers` })

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: `owners.${ownerIndex}.emails` })

  const ownerErrors = errors.owners?.[ownerIndex]
  const numbersError =
    typeof ownerErrors?.numbers?.message === "string"
      ? ownerErrors.numbers.message
      : undefined
  const emailsError =
    typeof ownerErrors?.emails?.message === "string"
      ? ownerErrors.emails.message
      : undefined

  return (
    <Box
      sx={
        multipleOwners
          ? {
              p: 3,
              border: "1px solid",
              borderColor: "border.main",
              borderRadius: 1,
            }
          : undefined
      }
    >
      {(multipleOwners || canRemoveOwner) && (
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
            Stakeholder {ownerIndex + 1}
          </Typography>
          {canRemoveOwner && (
            <IconButton
              type="button"
              size="small"
              onClick={onRemoveOwner}
              aria-label="Remove stakeholder"
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
            htmlFor={`owner-name-${ownerIndex}`}
            label="Name"
            required
            error={ownerErrors?.name?.message}
          >
            <TextField
              id={`owner-name-${ownerIndex}`}
              fullWidth
              variant="standard"
              placeholder="Enter stakeholder name"
              error={Boolean(ownerErrors?.name)}
              sx={underlineFieldSx}
              {...register(`owners.${ownerIndex}.name`, {
                required: "Stakeholder name is required",
                minLength: {
                  value: 2,
                  message: "Stakeholder name must be at least 2 characters",
                },
              })}
            />
          </FormField>

          <FormField
            htmlFor={`owner-position-${ownerIndex}`}
            label="Position"
            required
            error={ownerErrors?.position?.message}
          >
            <TextField
              id={`owner-position-${ownerIndex}`}
              fullWidth
              variant="standard"
              placeholder="e.g. Owner, Director, CFO"
              error={Boolean(ownerErrors?.position)}
              sx={underlineFieldSx}
              {...register(`owners.${ownerIndex}.position`, {
                required: "Position is required",
                minLength: {
                  value: 2,
                  message: "Position must be at least 2 characters",
                },
              })}
            />
          </FormField>
        </Box>

        <FormField label="Mobile Numbers" required error={numbersError}>
          <Stack spacing={2}>
            {numberFields.map((numberField, numberIndex) => {
              const numberErrors = ownerErrors?.numbers?.[numberIndex]

              return (
                <Stack
                  key={numberField.id}
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                >
                  <Box sx={{ width: 120, flexShrink: 0 }}>
                    <Controller
                      name={`owners.${ownerIndex}.numbers.${numberIndex}.countryCode`}
                      control={control}
                      rules={{ required: "Country code is required" }}
                      render={({ field: { onChange, value, ref } }) => (
                        <Autocomplete
                          options={countryCodes}
                          value={
                            countryCodes.find((item) => item.code === value) ||
                            null
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
                              error={Boolean(numberErrors?.countryCode)}
                              sx={underlineFieldSx}
                            />
                          )}
                        />
                      )}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="9876543210"
                      inputMode="numeric"
                      error={Boolean(numberErrors?.mobileNumber || numberErrors?.countryCode)}
                      helperText={
                        numberErrors?.mobileNumber?.message ||
                        numberErrors?.countryCode?.message
                      }
                      sx={underlineFieldSx}
                      {...register(
                        `owners.${ownerIndex}.numbers.${numberIndex}.mobileNumber`,
                        {
                          required: "Mobile number is required",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Enter a valid 10-digit mobile number",
                          },
                        },
                      )}
                    />
                  </Box>
                  {numberFields.length > 1 && (
                    <IconButton
                      type="button"
                      size="small"
                      onClick={() => removeNumber(numberIndex)}
                      aria-label="Remove mobile number"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              )
            })}
          </Stack>

          <Button
            type="button"
            onClick={() => appendNumber({ countryCode: "+91", mobileNumber: "" })}
            startIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
            sx={{ ...linkButtonSx, mt: 1.5, fontSize: "0.75rem" }}
          >
            Add another number
          </Button>
        </FormField>

        <FormField label="Email Addresses" required error={emailsError}>
          <Stack spacing={2}>
            {emailFields.map((emailField, emailIndex) => {
              const emailError = ownerErrors?.emails?.[emailIndex]?.email

              return (
                <Stack
                  key={emailField.id}
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <TextField
                      fullWidth
                      type="email"
                      variant="standard"
                      placeholder="name@company.com"
                      error={Boolean(emailError)}
                      helperText={emailError?.message}
                      sx={underlineFieldSx}
                      {...register(`owners.${ownerIndex}.emails.${emailIndex}.email`, {
                        required: "Email address is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                  </Box>
                  {emailFields.length > 1 && (
                    <IconButton
                      type="button"
                      size="small"
                      onClick={() => removeEmail(emailIndex)}
                      aria-label="Remove email address"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              )
            })}
          </Stack>

          <Button
            type="button"
            onClick={() => appendEmail({ email: "" })}
            startIcon={<AddIcon sx={{ fontSize: "1rem" }} />}
            sx={{ ...linkButtonSx, mt: 1.5, fontSize: "0.75rem" }}
          >
            Add another email
          </Button>
        </FormField>
      </Stack>
    </Box>
    
  )
}

export default function OwnerDetailsForm({ defaultValues, draftId, isFirstStep, onBack, onSaved }) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(ownerDetailsSchema),
  })

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form

  const {
    fields: ownerFields,
    append: appendOwner,
    remove: removeOwner,
  } = useFieldArray({ control, name: "owners" })

  const ownersError =
    typeof errors.owners?.message === "string" ? errors.owners.message : undefined

  const onSubmit = async (values) => {
    try {
      const response = await saveOwnerDetails(values, draftId)

      if (response?.success === false) {
        setError("root", {
          type: "server",
          message: response.message ?? "Failed to save stakeholder details",
        })
        return
      }

      onSaved(response.draft)
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message ?? "Failed to save stakeholder details",
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
              Stakeholder Details
            </Typography>
            <IconButton
              type="button"
              size="small"
              onClick={() =>
                appendOwner({
                  name: "",
                  position: "",
                  numbers: [{ countryCode: "+91", mobileNumber: "" }],
                  emails: [{ email: "" }],
                })
              }
              aria-label="Add another stakeholder"
              sx={{ color: "primary.main", alignItems: "center" }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>

          {ownersError && (
            <Typography
              role="alert"
              sx={{ fontSize: "0.875rem", fontWeight: 400, color: "error.main" }}
            >
              {ownersError}
            </Typography>
          )}

          <Stack spacing={4}>
            {ownerFields.map((ownerField, ownerIndex) => (
              <Fragment key={ownerField.id}>
                <OwnerCard
                  ownerIndex={ownerIndex}
                  multipleOwners={ownerFields.length > 1}
                  canRemoveOwner={ownerFields.length > 1}
                  onRemoveOwner={() => removeOwner(ownerIndex)}
                />
              </Fragment>
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
