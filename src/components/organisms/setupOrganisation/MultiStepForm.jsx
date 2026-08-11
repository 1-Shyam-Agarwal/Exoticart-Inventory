import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMultiStepForm } from "../../../hooks/useMultiStepForm"
import ProgressSteps from "./ProgressSteps"

function MultiStepForm() {
  const {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    goToPreviousStep,
    submitForm,
    resetForm,
    updateFormData,
  } = useMultiStepForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
  })

  useEffect(() => {
    if (isSubmitted) {
      submitForm(formData)
    }
  }, [currentStep, formData, reset])

  return (
    <div >
      <ProgressSteps currentStep={currentStep} steps={steps} />
      <h1>Multi Step Form</h1>
    </div>
  )
}

export default MultiStepForm