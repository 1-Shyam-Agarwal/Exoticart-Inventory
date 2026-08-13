import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import BusinessIcon from "@mui/icons-material/Business"
import PersonIcon from "@mui/icons-material/Person"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkHistoryIcon from "@mui/icons-material/WorkHistory"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"

import {
  organizationIdentitySchema,
  ownerDetailsSchema,
  locationSchema,
  businessDetailsSchema,
  bankDetailsSchema,
} from "../validation/schema"

export const steps = [
  {
    id: 1,
    title: "Organization Identity",
    icon: <BusinessIcon />,
  },
  {
    id: 2,
    title: "Owner Details",
    icon: <PersonIcon />,
  },
  {
    id: 3,
    title: "Location",
    icon: <LocationOnIcon />,
  },
  {
    id: 4,
    title: "Business Details",
    icon: <WorkHistoryIcon />,
  },
  {
    id: 5,
    title: "Bank Details",
    icon: <AccountBalanceIcon />,
  },
]

const STEP_FIELDS = [
  ["name", "industry", "logoFile"],
  ["ownerName", "countryCode", "mobileNumber", "email"],
  [
    "country",
    "state",
    "currency",
    "timezone",
    "street1",
    "street2",
    "city",
    "postalCode",
  ],
  ["inventoryStartDate", "fiscalYear", "pan", "gst"],
  [
    "accountHolderName",
    "bankName",
    "accountNumber",
    "ifscCode",
    "accountType",
    "upiId",
    "qrFile",
  ],
]

const stepSchemas = [
  organizationIdentitySchema,
  ownerDetailsSchema,
  locationSchema,
  businessDetailsSchema,
  bankDetailsSchema,
]

const defaultValues = {
  name: "",
  industry: "",
  logoFile: undefined,

  ownerName: "",
  countryCode: "",
  mobileNumber: "",
  email: "",

  country: "",
  state: "",
  currency: "",
  timezone: "",
  street1: "",
  street2: "",
  city: "",
  postalCode: "",

  inventoryStartDate: undefined,
  fiscalYear: "",
  pan: "",
  gst: "",

  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "",
  upiId: "",
  qrFile: undefined,
}

function pickStepValues(stepIndex, values) {
  return Object.fromEntries(
    STEP_FIELDS[stepIndex].map((field) => [field, values[field]]),
  )
}

function applyStepErrors(setError, clearErrors, stepIndex, result) {
  clearErrors(STEP_FIELDS[stepIndex])

  if (result.success) return

  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (field == null) continue
    setError(String(field), {
      type: "validation",
      message: issue.message,
    })
  }
}

function validateStep(stepIndex, values, setError, clearErrors) {
  const result = stepSchemas[stepIndex].safeParse(
    pickStepValues(stepIndex, values),
  )

  applyStepErrors(setError, clearErrors, stepIndex, result)

  return result
}

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const {
    trigger,
    handleSubmit,
    reset,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = form

  const watchedValues = watch()

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const canContinue = useMemo(() => {
    return stepSchemas[currentStep].safeParse(
      pickStepValues(currentStep, watchedValues),
    ).success
  }, [currentStep, watchedValues])

  const goToNextStep = () => {
    const result = validateStep(currentStep, getValues(), setError, clearErrors)

    if (!result.success || isLastStep) {
      return
    }

    console.log("Form data:", getValues())
    setCurrentStep((prev) => prev + 1)
  }

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step) => {
    // Only allow going back to completed steps — future points stay disabled
    if (step < 0 || step >= steps.length || step >= currentStep) {
      return
    }

    setCurrentStep(step)
  }

  const submitForm = async (data) => {
    const result = validateStep(currentStep, data, setError, clearErrors)

    if (!result.success) {
      return
    }

    try {
      console.log("Form data submitted:", data)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submit error:", error)
    }
  }

  const resetForm = () => {
    reset(defaultValues)
    setCurrentStep(0)
    setIsSubmitted(false)
  }

  return {
    ...form,

    currentStep,
    steps,

    isFirstStep,
    isLastStep,
    canContinue,

    errors,
    isSubmitting,
    isSubmitted,

    goToNextStep,
    goToPreviousStep,
    goToStep,

    submitForm,
    handleSubmit,
    trigger,

    getValues,
    resetForm,
  }
}
