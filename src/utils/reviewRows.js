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

export function buildOwnerTableRows(values) {
  const owners = values.owners || []

  return owners.map((owner, index) => ({
    id: index,
    name: display(owner.name),
    position: display(owner.position),
    mobile: (owner.numbers || [])
      .map((number) => `${number.countryCode || ""} ${number.mobileNumber || ""}`.trim())
      .filter(Boolean),
    email: (owner.emails || []).map((entry) => entry.email).filter(Boolean),
  }))
}

export function buildLocationRows(values) {
  return [
    { label: "Country", value: display(values.country) },
    { label: "State / UT", value: display(values.state) },
    { label: "Currency", value: display(values.currency) },
    { label: "Timezone", value: display(values.timezone) },
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

export function buildBankTableRows(values) {
  const accounts = values.bankAccounts || []

  return accounts.map((account, index) => ({
    id: index,
    accountHolderName: display(account.accountHolderName),
    bankName: display(account.bankName),
    accountNumber: display(account.accountNumber),
    ifscCode: display(account.ifscCode),
    accountType: display(
      ACCOUNT_TYPE_LABELS[account.accountType] || account.accountType,
    ),
    upiId: display(account.upiId),
    qrCode: account.qrPreview || null,
  }))
}
