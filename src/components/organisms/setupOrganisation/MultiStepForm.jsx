import { FormProvider } from "react-hook-form"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useMultiStepForm } from "../../../hooks/useMultiStepForm"
import ProgressBar from "../../molecules/setupOrganisation/ProgressBar"
import StepOrganizationIdentity from "../../molecules/setupOrganisation/StepOrganizationIdentity"
import StepOwnerDetails from "../../molecules/setupOrganisation/StepOwnerDetails"
import StepLocation from "../../molecules/setupOrganisation/StepLocation"
import StepBusinessDetails from "../../molecules/setupOrganisation/StepBusinessDetails"
import StepBankDetails from "../../molecules/setupOrganisation/StepBankDetails"

function MultiStepForm() {
  const form = useMultiStepForm()
  const {
    currentStep,
    steps,
    isFirstStep,
    isLastStep,
    isSubmitting,
    goToNextStep,
    goToPreviousStep,
    handleSubmit,
    submitForm,
  } = form

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack direction="row" spacing={3} sx={{ p: 3, alignItems: "flex-start" }}>
          <ProgressBar currentStep={currentStep} steps={steps} />

          <Stack spacing={3} sx={{ flex: 1, maxWidth: 480 }}>
            {currentStep === 0 && <StepOrganizationIdentity />}
            {currentStep === 1 && <StepOwnerDetails />}
            {currentStep === 2 && <StepLocation />}
            {currentStep === 3 && <StepBusinessDetails />}
            {currentStep === 4 && <StepBankDetails />}

            <Stack direction="row" spacing={1.5} justifyContent="flex-end">
              {!isFirstStep ? (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={goToPreviousStep}
                  sx={{ textTransform: "none" }}
                >
                  Back
                </Button>
              ) : null}

              {isLastStep ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ textTransform: "none" }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  onClick={goToNextStep}
                  sx={{ textTransform: "none" }}
                >
                  Next
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default MultiStepForm
