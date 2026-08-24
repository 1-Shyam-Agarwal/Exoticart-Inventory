import { useState } from "react"
import Box from "@mui/material/Box"
import {
  buildBankTableRows,
  buildBusinessRows,
  buildIdentityRows,
  buildLocationRows,
  buildOwnerTableRows,
} from "../../../utils/reviewRows"
import { finalizeOrganizationDraft } from "../../../services/organizationDraft"
import FormActions from "./FormNavActions"
import ReviewDataTable from "./ReviewDataTable"
import ReviewSection from "./ReviewSection"
import StepLayout from "./StepLayout"

const STAKEHOLDER_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "position", label: "Position" },
  { key: "mobile", label: "Mobile" },
  { key: "email", label: "Email" },
]

const BANK_COLUMNS = [
  { key: "accountHolderName", label: "Account Holder" },
  { key: "bankName", label: "Bank Name" },
  { key: "accountNumber", label: "Account Number" },
  { key: "ifscCode", label: "IFSC" },
  { key: "accountType", label: "Account Type" },
  { key: "upiId", label: "UPI ID" },
  {
    key: "qrCode",
    label: "QR Code",
    render: (value) =>
      value ? (
        <Box
          component="img"
          src={value}
          alt="UPI QR code"
          sx={{
            height: 48,
            width: 48,
            objectFit: "contain",
            display: "block",
            borderRadius: 1,
          }}
        />
      ) : (
        "—"
      ),
  },
]

export default function Review({ data, draftId, onBack, onEditStep, onFinalized }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const values = data

  const handleFinalize = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await finalizeOrganizationDraft(draftId)

      if (result?.success === false) {
        setSubmitError(result.message ?? "Failed to create organization")
        return
      }

      onFinalized(result)
    } catch (error) {
      console.log("error : " , error)
      setSubmitError(error.message ?? "Failed to create organization")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleFinalize}>
      <StepLayout title="Review" maxWidth="60rem">
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
          title="Stakeholder Details"
          table={
            <ReviewDataTable
              columns={STAKEHOLDER_COLUMNS}
              rows={buildOwnerTableRows(values)}
            />
          }
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
          table={
            <ReviewDataTable columns={BANK_COLUMNS} rows={buildBankTableRows(values)} />
          }
          onEdit={() => onEditStep(4)}
        />
      </StepLayout>

      <FormActions
        isFirstStep={false}
        isLastStep
        isSubmitting={isSubmitting}
        onBack={onBack}
        submitError={submitError}
      />
    </form>
  )
}
