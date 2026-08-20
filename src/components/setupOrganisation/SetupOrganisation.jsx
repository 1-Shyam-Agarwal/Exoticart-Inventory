import * as React from "react"
import { FormProvider } from "react-hook-form"
import Box from "@mui/material/Box"
import { useMultiStepForm } from "../../hooks/useMultiStepForm"
import { steps } from "./constants"
import BankDetailsForm from "./components/BankDetailsForm"
import BusinessDetailsForm from "./components/BusinessDetailsForm"
import FormNavActions from "./components/FormNavActions"
import LocationForm from "./components/LocationForm"
import OrganizationIdentityForm from "./components/OrganizationIdentityForm"
import OwnerDetailsForm from "./components/OwnerDetailsForm"
import ProgressBar from "./components/ProgressBar"
import Review from "./components/Review"
import SetupOrgHeader from "./components/SetupOrgHeader"

function getStepContent(step, { onEditStep }) {
  switch (step) {
    case 0:
      return <OrganizationIdentityForm />
    case 1:
      return <OwnerDetailsForm />
    case 2:
      return <LocationForm />
    case 3:
      return <BusinessDetailsForm />
    case 4:
      return <BankDetailsForm />
    case 5:
      return <Review onEditStep={onEditStep} />
    default:
      throw new Error("Unknown step")
  }
}

export default function SetupOrganisation() {
  const form = useMultiStepForm()
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    isSubmitting,
    errors,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    handleSubmit,
    submitForm,
  } = form

  const handleNext = () => {
    goToNextStep()
  }

  const handleBack = () => {
    goToPreviousStep()
  }

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
        <SetupOrgHeader title="Setup Organization Profile" />

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
            <React.Fragment>
              {getStepContent(currentStep, { onEditStep: goToStep })}
              <FormNavActions
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                isSubmitting={isSubmitting}
                onBack={handleBack}
                onContinue={handleNext}
                submitError={errors.root?.message}
              />
            </React.Fragment>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  )
}
