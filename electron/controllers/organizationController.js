import OrganizationService from "../services/organizationService.js"
import OrganizationDraftService from "../services/organizationDraftService.js"
import OrganizationSerialiser from "../serialisers/organisationSerialiser.js"

export default class OrganizationController {
  constructor(
    organizationService = new OrganizationService(),
    draftService = new OrganizationDraftService(),
    organizationSerialiser = new OrganizationSerialiser()
  ) {
    this.organizationService = organizationService
    this.draftService = draftService
    this.orgSerialiser = organizationSerialiser
  }

  async list() {
    try {
      const activeOrganizations = await this.organizationService.list()
      const draftOrganizations = await this.draftService.list()
      const orgs =  this.orgSerialiser.serialiseList(activeOrganizations , draftOrganizations);
      console.log({ success: true, ...orgs })
      return { success: true, ...orgs }
    } catch (error) {
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async show({ data }) {
    try {
      const organization = await this.organizationService.findById(data.id)
      return { success: true, organization }
    } catch (error) {
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async delete({ data }) {
    try {
      await this.organizationService.delete(data.id)
      return { success: true , message : "Organisation deleted successfully."}
    } catch (error) {
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }
}
