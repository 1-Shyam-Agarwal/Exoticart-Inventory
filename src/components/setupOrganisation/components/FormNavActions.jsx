import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { ghostButtonSx, primaryButtonSx } from "./styles"

export default function FormNavActions({
  isFirstStep,
  isLastStep,
  isSubmitting,
  onBack,
  onContinue,
  submitError,
}) {
  const navigate = useNavigate()

  return (
    <Stack component="footer" sx={{ mt: 6 }}>
      {submitError ? (
        <Typography
          role="alert"
          sx={{ mb: 2, fontSize: "0.875rem", fontWeight: 400, color: "error.main" }}
        >
          {submitError}
        </Typography>
      ) : null}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
    </Stack>
  )
}
