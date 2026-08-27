import { z } from "zod"
import BoxTypeService from "../services/boxTypeService.js"
import BoxTypeValidator from "../validators/boxTypeValidator.js"

export default class BoxTypeController {
  constructor(boxTypeService = new BoxTypeService()) {
    this.boxTypeService = boxTypeService
  }

  async list({ data }) {
    try {
      const { organizationId } = BoxTypeValidator.validateList(data)
      const boxTypes = await this.boxTypeService.list(organizationId)
      return { success: true, boxTypes }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid organization" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async create({ data }) {
    try {
      const fields = BoxTypeValidator.validateCreate(data)
      const boxType = await this.boxTypeService.create(fields)
      return { success: true, boxType }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid box type data" }
      }
      if (error?.code === "P2002") {
        return { success: false, message: "This box type already exists" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async update({ data }) {
    try {
      const fields = BoxTypeValidator.validateUpdate(data)
      const boxType = await this.boxTypeService.update(fields)
      return { success: true, boxType }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid box type data" }
      }
      if (error?.code === "P2002") {
        return { success: false, message: "This box type already exists" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async delete({ data }) {
    try {
      const { id } = BoxTypeValidator.validateDelete(data)
      await this.boxTypeService.delete(id)
      return { success: true, message: "Box type deleted successfully." }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid box type" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }
}
