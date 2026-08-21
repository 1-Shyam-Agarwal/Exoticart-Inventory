import { organizationIdentitySchema } from "../../shared/validation/organizationIdentitySchema.js"
import { ownerDetailsSchema } from "../../shared/validation/ownerDetailsSchema.js"
import { locationSchema } from "../../shared/validation/locationSchema.js"
import { businessDetailsSchema } from "../../shared/validation/businessDetailsSchema.js"

export default class OrganizationDraftValidator {
  static schema = organizationIdentitySchema
  static ownerDetailsSchema = ownerDetailsSchema
  static locationSchema = locationSchema
  static businessDetailsSchema = businessDetailsSchema

  static validateOrganisationIdentity(data) {
    return organizationIdentitySchema.parse(data)
  }

  static validateOwnerDetails(data) {
    return ownerDetailsSchema.parse(data)
  }

  static validateLocation(data) {
    return locationSchema.parse(data)
  }

  static validateBusinessDetails(data) {
    return businessDetailsSchema.parse(data)
  }
}
