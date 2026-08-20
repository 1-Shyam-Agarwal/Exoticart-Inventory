import { useState } from "react"
import { useForm } from "react-hook-form"
import { steps, stepSchemas } from "../components/setupOrganisation/constants"
import { defaultValues } from "../components/setupOrganisation/defaultValues"
import { validateStep } from "../components/setupOrganisation/validateStep"
import { createOrganization } from "../services/organizationApi"

export { steps }

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
    formState: { errors, isSubmitting },
  } = form

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

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
