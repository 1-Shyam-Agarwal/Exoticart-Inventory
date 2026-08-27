import { manufacturerCreateSchema, manufacturerDeleteSchema, manufacturerListSchema, manufacturerUpdateSchema } from "../../shared/validation/manufacturerSchema.js"

export default class ManufacturerValidator {
  static validateList(data) {
    return manufacturerListSchema.parse(data)
  }

  static validateCreate(data) {
    return manufacturerCreateSchema.parse(data)
  }

  static validateUpdate(data) {
    return manufacturerUpdateSchema.parse(data)
  }

  static validateDelete(data) {
    return manufacturerDeleteSchema.parse(data)
  }
}
