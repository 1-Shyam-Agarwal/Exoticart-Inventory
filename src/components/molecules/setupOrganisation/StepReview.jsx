import { useFormContext } from "react-hook-form"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import {
  buildBankRows,
  buildBusinessRows,
  buildIdentityRows,
  buildLocationRows,
  buildOwnerRows,
} from "../../../utils/reviewRows"
import { ReviewSection } from "./ReviewSection"
import { stepTitleSx } from "./fieldStyles"

export default function StepReview({ onEditStep }) {
  const { watch } = useFormContext()
  const values = watch()

  return (
    <Box sx={{ maxWidth: "42rem", width: "100%" }}>
      <Typography component="h2" sx={stepTitleSx}>
        Review
      </Typography>

      <Stack spacing={4}>
        <ReviewSection
          title="Organization Identity"
          rows={buildIdentityRows(values)}
          onEdit={() => onEditStep(0)}
          extra={
            values.logoPreview ? (
              <Box
                component="img"
                src={values.logoPreview}
                alt="Organization logo"
                sx={{
                  mt: 1,
                  maxHeight: 64,
                  maxWidth: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            ) : null
          }
        />

        <ReviewSection
          title="Owner Details"
          rows={buildOwnerRows(values)}
          onEdit={() => onEditStep(1)}
        />

        <ReviewSection
          title="Location"
          rows={buildLocationRows(values)}
          onEdit={() => onEditStep(2)}
        />

        <ReviewSection
          title="Business Details"
          rows={buildBusinessRows(values)}
          onEdit={() => onEditStep(3)}
        />

        <ReviewSection
          title="Bank Details"
          rows={buildBankRows(values)}
          onEdit={() => onEditStep(4)}
          extra={
            values.qrPreview ? (
              <Box
                component="img"
                src={values.qrPreview}
                alt="UPI QR code"
                sx={{
                  mt: 1,
                  maxHeight: 96,
                  maxWidth: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            ) : null
          }
        />
      </Stack>
    </Box>
  )
}
