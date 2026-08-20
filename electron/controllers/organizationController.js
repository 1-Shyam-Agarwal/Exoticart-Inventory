import OrganizationService from "../services/organizationService.js"
import BankDetailsService from "../services/bankDetailsService.js"
import FileStorageService from "../services/fileStorageService.js"
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
    const logoPath = FileStorageService.saveLogo(data.logo) ?? undefined
    const qrPath = FileStorageService.saveQrCode(data.qr) ?? undefined

    const organizationPayload = await OrganizationValidator.validateAsync({ ...data, logoPath })
    const bankDetailsPayload = await BankDetailsValidator.validateAsync({ ...data, qrPath })

    const organization = this.organizationService.create(organizationPayload)
    const bankDetails = this.bankDetailsService.create(organization.data.id, bankDetailsPayload)

    return { organization, bankDetails }
  }
}
