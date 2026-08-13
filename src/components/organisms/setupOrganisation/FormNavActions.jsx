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

export default function FormNavActions({
  isFirstStep,
  isLastStep,
  isSubmitting,
  onBack,
  onContinue,
}) {
  const navigate = useNavigate()

  return (
    <Stack
      component="footer"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 6 }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {!isFirstStep ? (
          <Button
            type="button"
            variant="text"
            onClick={onBack}
            sx={ghostButtonSx}
          >
            Previous
          </Button>
        ) : null}
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          type="button"
          variant="text"
          onClick={() => navigate("/")}
          sx={ghostButtonSx}
        >
          Cancel
        </Button>

        {isLastStep ? (
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={primaryButtonSx}
          >
            Create Organization
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            disabled={isSubmitting}
            onClick={onContinue}
            sx={primaryButtonSx}
          >
            Continue
          </Button>
        )}
      </Stack>
    </Stack>
  )
}
