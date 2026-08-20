import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { app } from "electron"

function extensionFor(fileTransfer) {
  const fromName = path.extname(fileTransfer.name ?? "")
  if (fromName) return fromName

  const fromType = { "image/png": ".png", "image/jpeg": ".jpg", "image/svg+xml": ".svg" }[
    fileTransfer.type
  ]
  return fromType ?? ""
}

export default class FileStorageService {
  static #save(fileTransfer, subfolder) {
    if (!fileTransfer) return null

    const dir = path.join(app.getPath("userData"), "uploads", subfolder)
    fs.mkdirSync(dir, { recursive: true })

    const filename = `${randomUUID()}${extensionFor(fileTransfer)}`
    const filePath = path.join(dir, filename)

    fs.writeFileSync(filePath, Buffer.from(fileTransfer.buffer))

    return filePath
  }

  static saveLogo(fileTransfer) {
    return FileStorageService.#save(fileTransfer, "logos")
  }

  static saveQrCode(fileTransfer) {
    return FileStorageService.#save(fileTransfer, "qr-codes")
  }
}
