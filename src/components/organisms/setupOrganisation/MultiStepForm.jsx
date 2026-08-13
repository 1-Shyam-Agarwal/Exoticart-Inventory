import { FormProvider } from "react-hook-form"
import Box from "@mui/material/Box"
import { useMultiStepForm } from "../../../hooks/useMultiStepForm"
import ProgressBar from "./ProgressBar"
import FormNavActions from "./FormNavActions"
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
    canContinue,
    goToNextStep,
    goToPreviousStep,
    handleSubmit,
    submitForm,
  } = form

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "background.main",
        }}
      >
        <Box
          component="main"
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "flex-start",
            gap: { xs: 5, lg: 10 },
            px: { xs: 4, sm: 6, lg: 8 },
            py: { xs: 4, lg: 5 },
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              height: "auto",
              position: { lg: "sticky" },
              top: { lg: 32 },
            }}
          >
            <ProgressBar currentStep={currentStep} steps={steps} />
          </Box>

          <Box
            component="section"
            sx={{
              minWidth: 0,
              width: "100%",
              maxWidth: "42rem",
              flex: 1,
            }}
          >
            {currentStep === 0 && <StepOrganizationIdentity />}
            {currentStep === 1 && <StepOwnerDetails />}
            {currentStep === 2 && <StepLocation />}
            {currentStep === 3 && <StepBusinessDetails />}
            {currentStep === 4 && <StepBankDetails />}

            <FormNavActions
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              isSubmitting={isSubmitting}
              canContinue={canContinue}
              onBack={goToPreviousStep}
              onContinue={goToNextStep}
            />
          </Box>
        </Box>
      </Box>
    </FormProvider>
  )
}

export default MultiStepForm
