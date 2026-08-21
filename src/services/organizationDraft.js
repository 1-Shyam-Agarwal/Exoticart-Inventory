import { TransferableFile } from "../utils/transferableFile"

export async function saveOrganizationIdentity(values, draftId) {
  const { name, industry, logoFile } = values

  const logo = await TransferableFile(logoFile)

  return window.api.organizationDraft.saveOrganisationIdentity({ draftId, name, industry, logo })
}
