import timezones from "../../data/timezone.json"

function detectTimezone() {
  try {
    let detected = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (detected === "Asia/Kolkata") detected = "Asia/Calcutta"
    if (timezones.includes(detected)) return detected
  } catch {
    // fall through
  }
  return "Asia/Calcutta"
}

function startOfToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export const defaultValues = {
  name: "",
  industry: "",
  logoFile: undefined,
  logoPreview: null,

  ownerName: "",
  countryCode: "+91",
  mobileNumber: "",
  email: "",

  country: "India",
  state: "",
  currency: "INR",
  timezone: detectTimezone(),
  street1: "",
  street2: "",
  city: "",
  postalCode: "",

  inventoryStartDate: startOfToday(),
  fiscalYear: "April - March",
  pan: "",
  gst: "",

  accountHolderName: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "",
  upiId: "",
  qrFile: undefined,
  qrPreview: null,
}
