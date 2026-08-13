const ACCOUNT_TYPE_LABELS = {
  savings: "Savings",
  current: "Current",
}

function display(value) {
  const trimmed = typeof value === "string" ? value.trim() : value
  return trimmed ? String(trimmed) : "—"
}

function formatReviewDate(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return "—"
  }

  return value.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function buildIdentityRows(values) {
  return [
    {
      label: "Logo",
      value:
        values.logoPreview || values.logoFile instanceof File
          ? "Uploaded"
          : "—",
    },
    { label: "Organization Name", value: display(values.name) },
    { label: "Industry", value: display(values.industry) },
  ]
}

export function buildOwnerRows(values) {
  return [
    { label: "Owner Name", value: display(values.ownerName) },
    {
      label: "Mobile",
      value: display(`${values.countryCode || ""} ${values.mobileNumber || ""}`.trim()),
    },
    { label: "Email", value: display(values.email) },
  ]
}

export function buildLocationRows(values) {
  const address = [values.street1, values.street2, values.city, values.postalCode]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ")

  return [
    { label: "Country", value: display(values.country) },
    { label: "State / UT", value: display(values.state) },
    { label: "Currency", value: display(values.currency) },
    { label: "Timezone", value: display(values.timezone) },
    { label: "Address", value: display(address) },
  ]
}

export function buildBusinessRows(values) {
  return [
    {
      label: "Inventory Start Date",
      value: formatReviewDate(values.inventoryStartDate),
    },
    { label: "Fiscal Year", value: display(values.fiscalYear) },
    { label: "PAN", value: display(values.pan) },
    { label: "GST", value: display(values.gst) },
  ]
}

export function buildBankRows(values) {
  return [
    { label: "Account Holder", value: display(values.accountHolderName) },
    { label: "Bank Name", value: display(values.bankName) },
    { label: "Account Number", value: display(values.accountNumber) },
    { label: "IFSC", value: display(values.ifscCode) },
    {
      label: "Account Type",
      value: display(ACCOUNT_TYPE_LABELS[values.accountType] || values.accountType),
    },
    { label: "UPI ID", value: display(values.upiId) },
    {
      label: "QR Code",
      value:
        values.qrPreview || values.qrFile instanceof File
          ? "Uploaded"
          : "—",
    },
  ]
}
