import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

const ghostButtonSx = {
  height: 40,
  px: 2.5,
  minWidth: 0,
  borderRadius: 9999,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  color: "text.secondary",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "action.hover",
    color: "text.primary",
    boxShadow: "none",
  },
}

const primaryButtonSx = {
  height: 40,
  px: 4,
  borderRadius: 9999,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  bgcolor: "primary.main",
  color: "primary.contrastText",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "primary.main",
    opacity: 0.8,
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    opacity: 0.5,
    color: "primary.contrastText",
    bgcolor: "primary.main",
  },
}

function SecondaryAction({ isFirstStep, onBack }) {
  const navigate = useNavigate()

  if (!isFirstStep) {
    return (
      <Button
        type="button"
        variant="text"
        onClick={onBack}
        sx={ghostButtonSx}
      >
        Back
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="text"
      onClick={() => navigate("/")}
      sx={ghostButtonSx}
    >
      Cancel
    </Button>
  )
}

function PrimaryAction({ isLastStep, isSubmitting, canContinue, onContinue }) {
  const disabled = isSubmitting || !canContinue

  if (isLastStep) {
    return (
      <Button
        type="submit"
        variant="contained"
        disabled={disabled}
        sx={primaryButtonSx}
      >
        Create Organization
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="contained"
      disabled={disabled}
      onClick={onContinue}
      sx={primaryButtonSx}
    >
      Continue
    </Button>
  )
}

export default function FormNavActions({
  isFirstStep,
  isLastStep,
  isSubmitting,
  canContinue,
  onBack,
  onContinue,
}) {
  return (
    <Stack
      component="footer"
      direction="row"
      spacing={1}
      justifyContent="flex-end"
      alignItems="center"
      sx={{ mt: 6 }}
    >
      <SecondaryAction isFirstStep={isFirstStep} onBack={onBack} />
      <PrimaryAction
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
        canContinue={canContinue}
        onContinue={onContinue}
      />
    </Stack>
  )
}
