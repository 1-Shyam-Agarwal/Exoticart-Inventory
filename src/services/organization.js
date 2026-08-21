import { TransferableFile } from "../utils/transferableFile"

export async function createOrganization(formData) {
  const { logoFile, logoPreview, qrFile, qrPreview, ...rest } = formData

  const [logo, qr] = await Promise.all([
    TransferableFile(logoFile),
    TransferableFile(qrFile),
  ])

  return window.api.organizations.create({ ...rest, logo, qr })
}
