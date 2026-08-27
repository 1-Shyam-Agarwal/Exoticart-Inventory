import { z } from "zod"
import ManufacturerService from "../services/manufacturerService.js"
import ManufacturerValidator from "../validators/manufacturerValidator.js"

export default class ManufacturerController {
  constructor(manufacturerService = new ManufacturerService()) {
    this.manufacturerService = manufacturerService
  }

  async list({ data }) {
    try {
      const { organizationId } = ManufacturerValidator.validateList(data)
      const manufacturers = await this.manufacturerService.list(organizationId)
      return { success: true, manufacturers }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid organization" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async create({ data }) {
    try {
      const fields = ManufacturerValidator.validateCreate(data)
      const manufacturer = await this.manufacturerService.create(fields)
      return { success: true, manufacturer }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid manufacturer data" }
      }
      if (error?.code === "P2002") {
        return { success: false, message: "This manufacturer already exists" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async delete({ data }) {
    try {
      const { id } = ManufacturerValidator.validateDelete(data)
      await this.manufacturerService.delete(id)
      return { success: true, message: "Manufacturer deleted successfully." }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid manufacturer" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }
}
