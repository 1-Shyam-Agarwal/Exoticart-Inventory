import { categoryCreateSchema, categoryDeleteSchema, categoryListSchema } from "../../shared/validation/categorySchema.js"

export default class CategoryValidator {
  static validateList(data) {
    return categoryListSchema.parse(data)
  }

  static validateCreate(data) {
    return categoryCreateSchema.parse(data)
  }

  static validateDelete(data) {
    return categoryDeleteSchema.parse(data)
  }
}
