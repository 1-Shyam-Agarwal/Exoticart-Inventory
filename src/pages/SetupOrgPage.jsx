import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import { defaultFormValues, onBoardingSteps } from "../../lib/constants.jsx"
import BankDetailsForm from "../components/molecules/setupOrganisation/BankDetailsForm.jsx"
import BusinessDetailsForm from "../components/molecules/setupOrganisation/BusinessDetailsForm.jsx"
import LocationForm from "../components/molecules/setupOrganisation/LocationForm.jsx"
import OrganizationIdentityForm from "../components/molecules/setupOrganisation/OrganizationIdentityForm.jsx"
import OwnerDetailsForm from "../components/molecules/setupOrganisation/OwnerDetailsForm.jsx"
import ProgressBar from "../components/setupOrganisation/ProgressBar.jsx"
import Review from "../components/molecules/setupOrganisation/Review.jsx"
import SetupOrgHeader from "../components/molecules/setupOrganisation/SetupOrgHeader.jsx"

function lastActiveStep(draft) {
  if (!draft) return 0
  return Math.min(onBoardingSteps.length - 1, Math.max(0, draft.currentStep - 1))
}

function OnboardingStep({
  step,
  defaultValues,
  draftId,
  isFirstStep,
  onBack,
  onSaved,
  onEditStep,
  onFinalized,
}) {
  switch (step) {
    case 0:
      return (
        <OrganizationIdentityForm
          defaultValues={defaultValues}
          draftId={draftId}
          isFirstStep={isFirstStep}
          onBack={onBack}
          onSaved={onSaved}
        />
      )
    case 1:
      return (
        <OwnerDetailsForm
          defaultValues={defaultValues}
          draftId={draftId}
          isFirstStep={isFirstStep}
          onBack={onBack}
          onSaved={onSaved}
        />
      )
    case 2:
      return (
        <LocationForm
          defaultValues={defaultValues}
          draftId={draftId}
          isFirstStep={isFirstStep}
          onBack={onBack}
          onSaved={onSaved}
        />
      )
    case 3:
      return (
        <BusinessDetailsForm
          defaultValues={defaultValues}
          draftId={draftId}
          isFirstStep={isFirstStep}
          onBack={onBack}
          onSaved={onSaved}
        />
      )
    case 4:
      return (
        <BankDetailsForm
          defaultValues={defaultValues}
          draftId={draftId}
          isFirstStep={isFirstStep}
          onBack={onBack}
          onSaved={onSaved}
        />
      )
    case 5:
      return (
        <Review
          data={defaultValues}
          draftId={draftId}
          onBack={onBack}
          onEditStep={onEditStep}
          onFinalized={onFinalized}
        />
      )
  }
}

export default function SetupOrganisation() {
  const location = useLocation()
  const navigate = useNavigate()
  const draft = location.state?.draft ?? null

  const [currentStep, setCurrentStep] = useState(() => lastActiveStep(draft))
  const [draftId, setDraftId] = useState(draft?.id ?? null)
  const [formData, setFormData] = useState(() => ({
    ...defaultFormValues,
    ...(draft?.data ?? {}),
  }))

  const isFirstStep = currentStep === 0

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step) => {
    if (step < 0 || step >= onBoardingSteps.length || step >= currentStep) {
      return
    }

    setCurrentStep(step)
  }

  const handleStepSaved = (updatedDraft) => {
    setDraftId(updatedDraft.id)
    setFormData((prev) => ({ ...prev, ...updatedDraft.data }))
    goToNextStep()
  }

  const handleFinalized = () => {
    navigate("/")
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden"
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
            height: "auto",
            position: { lg: "sticky" },
            top: { lg: 32 },
          }}
        >
          <ProgressBar currentStep={currentStep} steps={onBoardingSteps} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <OnboardingStep
            step={currentStep}
            defaultValues={formData}
            draftId={draftId}
            isFirstStep={isFirstStep}
            onBack={goToPreviousStep}
            onSaved={handleStepSaved}
            onEditStep={goToStep}
            onFinalized={handleFinalized}
          />
        </Box>
      </Box>
    </Box>
  )
}
