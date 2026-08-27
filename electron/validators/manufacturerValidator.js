import { manufacturerCreateSchema, manufacturerDeleteSchema, manufacturerListSchema } from "../../shared/validation/manufacturerSchema.js"

export default class ManufacturerValidator {
  static validateList(data) {
    return manufacturerListSchema.parse(data)
  }

  static validateCreate(data) {
    return manufacturerCreateSchema.parse(data)
  }

  static validateDelete(data) {
    return manufacturerDeleteSchema.parse(data)
  }
}
