import { useState } from "react"
import { useForm } from "react-hook-form"
import { steps, stepSchemas } from "../components/setupOrganisation/constants"
import { defaultValues } from "../components/setupOrganisation/defaultValues"
import { validateStep } from "../components/setupOrganisation/validateStep"
import { createOrganization } from "../services/organization"
import { saveOrganizationIdentity, saveOwnerDetails, saveLocation, saveBusinessDetails, saveBankDetails } from "../services/organizationDraft"

export { steps }

function getResumeStep(initialDraft) {
  if (!initialDraft) return 0
  return Math.min(steps.length - 1, Math.max(0, (initialDraft.currentStep ?? 1) - 1))
}

function getResumeValues(initialDraft) {
  if (!initialDraft?.data) return defaultValues

  const merged = { ...defaultValues, ...initialDraft.data }

  if (initialDraft.data.inventoryStartDate) {
    merged.inventoryStartDate = new Date(initialDraft.data.inventoryStartDate)
  }

  return merged
}

export function useMultiStepForm(initialDraft = null) {
  const [currentStep, setCurrentStep] = useState(() => getResumeStep(initialDraft))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [draftId, setDraftId] = useState(initialDraft?.id ?? null)
  const [isSavingStep, setIsSavingStep] = useState(false)

  const form = useForm({
    defaultValues: getResumeValues(initialDraft),
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
    formState: { errors, isSubmitting },
  } = form

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const goToNextStep = async () => {
    const result = validateStep(currentStep, getValues(), setError, clearErrors)

    if (!result.success || isLastStep) {
      return
    }

    if (currentStep === 0) {
      setIsSavingStep(true)
      try {
        const response = await saveOrganizationIdentity(getValues(), draftId)

        if (response?.success === false) {
          setError("root", {
            type: "server",
            message: response.message ?? "Failed to save organization identity",
          })
          return
        }

        console.log("response : draft : id " ,response.draft.id );

        setDraftId(response.draft.id)
      } catch (error) {
        setError("root", {
          type: "server",
          message: error.message ?? "Failed to save organization identity",
        })
        return
      } finally {
        setIsSavingStep(false)
      }
    } else if (currentStep === 1) {
      setIsSavingStep(true)
      try {
        const response = await saveOwnerDetails(getValues(), draftId)

        if (response?.success === false) {
          setError("root", {
            type: "server",
            message: response.message ?? "Failed to save owner details",
          })
          return
        }

        setDraftId(response.draft.id)
      } catch (error) {
        setError("root", {
          type: "server",
          message: error.message ?? "Failed to save owner details",
        })
        return
      } finally {
        setIsSavingStep(false)
      }
    } else if (currentStep === 2) {
      setIsSavingStep(true)
      try {
        const response = await saveLocation(getValues(), draftId)

        if (response?.success === false) {
          setError("root", {
            type: "server",
            message: response.message ?? "Failed to save location",
          })
          return
        }

        setDraftId(response.draft.id)
      } catch (error) {
        setError("root", {
          type: "server",
          message: error.message ?? "Failed to save location",
        })
        return
      } finally {
        setIsSavingStep(false)
      }
    } else if (currentStep === 3) {
      setIsSavingStep(true)
      try {
        const response = await saveBusinessDetails(getValues(), draftId)

        if (response?.success === false) {
          setError("root", {
            type: "server",
            message: response.message ?? "Failed to save business details",
          })
          return
        }

        setDraftId(response.draft.id)
      } catch (error) {
        setError("root", {
          type: "server",
          message: error.message ?? "Failed to save business details",
        })
        return
      } finally {
        setIsSavingStep(false)
      }
    } else if (currentStep === 4) {
      setIsSavingStep(true)
      try {
        const response = await saveBankDetails(getValues(), draftId)

        if (response?.success === false) {
          setError("root", {
            type: "server",
            message: response.message ?? "Failed to save bank details",
          })
          return
        }

        setDraftId(response.draft.id)
      } catch (error) {
        setError("root", {
          type: "server",
          message: error.message ?? "Failed to save bank details",
        })
        return
      } finally {
        setIsSavingStep(false)
      }
    }

    setCurrentStep((prev) => prev + 1)
  }

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step) => {
    if (step < 0 || step >= steps.length || step >= currentStep) {
      return
    }

    setCurrentStep(step)
  }

  const submitForm = async (data) => {
    for (let stepIndex = 0; stepIndex < stepSchemas.length - 1; stepIndex += 1) {
      const result = validateStep(stepIndex, data, setError, clearErrors)
      if (!result.success) {
        setCurrentStep(stepIndex)
        return
      }
    }

    try {
      const result = await createOrganization(data)

      if (result?.organization?.success === false) {
        setError("root", {
          type: "server",
          message: result.organization.message ?? "Failed to create organization",
        })
        return
      }

      setIsSubmitted(true)
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message ?? "Failed to create organization",
      })
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

    errors,
    isSubmitting,
    isSubmitted,
    isSavingStep,

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
