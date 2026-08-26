import { z } from "zod"
import CategoryService from "../services/categoryService.js"
import CategoryValidator from "../validators/categoryValidator.js"

export default class CategoryController {
  constructor(categoryService = new CategoryService()) {
    this.categoryService = categoryService
  }

  async list({ data }) {
    try {
      const { organizationId } = CategoryValidator.validateList(data)
      const categories = await this.categoryService.list(organizationId)
      return { success: true, categories }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid organization" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async create({ data }) {
    try {
      const fields = CategoryValidator.validateCreate(data)
      const category = await this.categoryService.create(fields)
      return { success: true, category }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid category data" }
      }
      if (error?.code === "P2002") {
        return { success: false, message: "This category already exists" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }

  async delete({ data }) {
    try {
      const { id } = CategoryValidator.validateDelete(data)
      await this.categoryService.delete(id)
      return { success: true, message: "Category deleted successfully." }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, message: error?.message ?? "Invalid category" }
      }
      return { success: false, message: error?.message ?? "Internal Server Error" }
    }
  }
}
