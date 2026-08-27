import { z } from "zod"
import BrandService from "../services/brandService.js"
import BrandValidator from "../validators/brandValidator.js"

export default class BrandController {
  constructor(brandService = new BrandService()) {
    this.brandService = brandService
  }

  async list({ data }) {
    try {
      const { organizationId } = BrandValidator.validateList(data)
      const brands = await this.brandService.list(organizationId)
      return { success: true, brands }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid organization" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async create({ data }) {
    try {
      const fields = BrandValidator.validateCreate(data)
      const brand = await this.brandService.create(fields)
      return { success: true, brand }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid brand data" }
      }
      if (error?.code === "P2002") {
        return { success: false, message: "This brand already exists" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async update({ data }) {
    try {
      const fields = BrandValidator.validateUpdate(data)
      const brand = await this.brandService.update(fields)
      return { success: true, brand }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid brand data" }
      }
      if (error?.code === "P2002") {
        return { success: false, message: "This brand already exists" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async delete({ data }) {
    try {
      const { id } = BrandValidator.validateDelete(data)
      await this.brandService.delete(id)
      return { success: true, message: "Brand deleted successfully." }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid brand" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }
}
