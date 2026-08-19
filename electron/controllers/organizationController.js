import OrganizationService from "../services/organizationService.js"
import BankDetailsService from "../services/bankDetailsService.js"
import OrganizationValidator from "../validators/organizationValidator.js"
import BankDetailsValidator from "../validators/bankDetailsValidator.js"

export default class OrganizationsController {
  constructor(
    organizationService = new OrganizationService(),
    bankDetailsService = new BankDetailsService(),
  ) {
    this.organizationService = organizationService
    this.bankDetailsService = bankDetailsService
  }

  // GET /organizations/:id — organization profile plus its bank details.
  async show({ data }) {
    const organization = this.organizationService.findById(data.id)
    const bankDetails = this.bankDetailsService.findByOrganizationId(data.id)

    return { organization, bankDetails }
  }

  async store({ data }) {
    const organizationPayload = await OrganizationValidator.validateAsync(data)
    const bankDetailsPayload = await BankDetailsValidator.validateAsync(data)

    const organization = this.organizationService.create(organizationPayload)
    const bankDetails = this.bankDetailsService.create(organization.data.id, bankDetailsPayload)

    return { organization, bankDetails }
  }
}
