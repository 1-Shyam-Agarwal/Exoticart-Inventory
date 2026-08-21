import { TransferableFile } from "../utils/transferableFile"

export async function saveOrganizationIdentity(values, draftId) {
  const { name, industry, logoFile } = values

  const logo = await TransferableFile(logoFile)

  return window.api.organizationDraft.saveOrganisationIdentity({ draftId, name, industry, logo })
}

export async function saveOwnerDetails(values, draftId) {
  const { ownerName, countryCode, mobileNumber, email } = values

  return window.api.organizationDraft.saveOwnerDetails({
    draftId,
    ownerName,
    countryCode,
    mobileNumber,
    email,
  })
}

export async function saveLocation(values, draftId) {
  const { country, state, currency, timezone, street1, street2, city, postalCode } = values

  return window.api.organizationDraft.saveLocation({
    draftId,
    country,
    state,
    currency,
    timezone,
    street1,
    street2,
    city,
    postalCode,
  })
}

export async function saveBusinessDetails(values, draftId) {
  const { inventoryStartDate, fiscalYear, pan, gst } = values

  return window.api.organizationDraft.saveBusinessDetails({
    draftId,
    inventoryStartDate,
    fiscalYear,
    pan,
    gst,
  })
}

export async function saveBankDetails(values, draftId) {
  const { accountHolderName, bankName, accountNumber, ifscCode, accountType, upiId, qrFile } = values

  const qr = await TransferableFile(qrFile)

  return window.api.organizationDraft.saveBankDetails({
    draftId,
    accountHolderName,
    bankName,
    accountNumber,
    ifscCode,
    accountType,
    upiId,
    qr,
  })
}
