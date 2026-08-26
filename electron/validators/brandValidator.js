import { brandCreateSchema, brandDeleteSchema, brandListSchema } from "../../shared/validation/brandSchema.js"

export default class BrandValidator {
  static validateList(data) {
    return brandListSchema.parse(data)
  }

  static validateCreate(data) {
    return brandCreateSchema.parse(data)
  }

  static validateDelete(data) {
    return brandDeleteSchema.parse(data)
  }
}
