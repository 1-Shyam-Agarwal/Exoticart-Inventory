import { TransferableFile } from "../utils/transferableFile"

export async function listOrganizationDrafts() {
  return window.api.organizationDraft.list()
}

export async function saveOrganizationIdentity(values, draftId) {
  const { name, industry, logoFile } = values

  const logo = await TransferableFile(logoFile)

  return window.api.organizationDraft.saveOrganisationIdentity({ draftId, name, industry, logo })
}

export async function saveOwnerDetails(values, draftId) {
  const { owners } = values

  return window.api.organizationDraft.saveOwnerDetails({
    draftId,
    owners,
  })
}

export async function saveLocation(values, draftId) {
  const { country, state, currency, timezone } = values

  return window.api.organizationDraft.saveLocation({
    draftId,
    country,
    state,
    currency,
    timezone,
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
  const { bankAccounts } = values

  const preparedAccounts = await Promise.all(
    (bankAccounts || []).map(async (account) => {
      const rest = { ...account }
      delete rest.qrFile
      delete rest.qrPreview

      const qr = await TransferableFile(account.qrFile)
      return { ...rest, qr }
    }),
  )

  return window.api.organizationDraft.saveBankDetails({
    draftId,
    bankAccounts: preparedAccounts,
  })
}

export async function finalizeOrganizationDraft(draftId) {
  return window.api.organizationDraft.finalize({ draftId })
}

export async function deleteOrganizationDraft(draftId) {
  return window.api.organizationDraft.delete({ draftId })
}
