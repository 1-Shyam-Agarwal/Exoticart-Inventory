async function fileToTransferable(file) {
  if (!file) return null

  return {
    name: file.name,
    type: file.type,
    buffer: await file.arrayBuffer(),
  }
}

export async function createOrganization(formData) {
  const { logoFile, logoPreview, qrFile, qrPreview, ...rest } = formData

  const [logo, qr] = await Promise.all([
    fileToTransferable(logoFile),
    fileToTransferable(qrFile),
  ])

  return window.api.organizations.create({ ...rest, logo, qr })
}
