export async function TransferableFile(file) {
  if (!file) return null

  return {
    name: file.name,
    type: file.type,
    buffer: await file.arrayBuffer(),
  }
}
