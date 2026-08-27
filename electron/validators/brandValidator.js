import { brandCreateSchema, brandDeleteSchema, brandListSchema, brandUpdateSchema } from "../../shared/validation/brandSchema.js"

export default class BrandValidator {
  static validateList(data) {
    return brandListSchema.parse(data)
  }

  static validateCreate(data) {
    return brandCreateSchema.parse(data)
  }

  static validateUpdate(data) {
    return brandUpdateSchema.parse(data)
  }

  static validateDelete(data) {
    return brandDeleteSchema.parse(data)
  }
}
