import { boxTypeCreateSchema, boxTypeDeleteSchema, boxTypeListSchema } from "../../shared/validation/boxTypeSchema.js"

export default class BoxTypeValidator {
  static validateList(data) {
    return boxTypeListSchema.parse(data)
  }

  static validateCreate(data) {
    return boxTypeCreateSchema.parse(data)
  }

  static validateDelete(data) {
    return boxTypeDeleteSchema.parse(data)
  }
}
