import { organizationIdentitySchema } from "../../shared/validation/organizationIdentitySchema.js"

export default class OrganizationDraftValidator {
  static schema = organizationIdentitySchema

  static validateOrganisationIdentity(data) {
    return organizationIdentitySchema.parse(data)
  }

  static async validateOrganisationIdentityAsync(data) {
    return organizationIdentitySchema.parseAsync(data)
  }
}
