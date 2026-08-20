import { getPrismaClient } from "../db/index.js"
import OrganizationService from "../services/organizationService.js"
import BankDetailsService from "../services/bankDetailsService.js"
import FileStorageService from "../services/fileStorageService.js"
import OrganizationValidator from "../validators/organizationValidator.js"
import BankDetailsValidator from "../validators/bankDetailsValidator.js"

export default class OrganizationsController {
  constructor(
    organizationService = new OrganizationService(),
    bankDetailsService = new BankDetailsService(),
    prisma = getPrismaClient(),
  ) {
    this.organizationService = organizationService
    this.bankDetailsService = bankDetailsService
    this.prisma = prisma
  }

  // GET /organizations/:id — organization profile plus its bank details.
  async show({ data }) {
    const organization = await this.organizationService.findById(data.id)
    const bankDetails = await this.bankDetailsService.findByOrganizationId(data.id)

    return { organization, bankDetails }
  }

  async store({ data }) {
    const logoPath = FileStorageService.saveLogo(data.logo) ?? undefined
    const qrPath = FileStorageService.saveQrCode(data.qr) ?? undefined

    const organizationPayload = await OrganizationValidator.validateAsync({ ...data, logoPath })
    const bankDetailsPayload = await BankDetailsValidator.validateAsync({ ...data, qrPath })

    return this.prisma.$transaction(async (tx) => {
      const organization = await this.organizationService.create(organizationPayload, tx)
      const bankDetails = await this.bankDetailsService.create(organization.data.id, bankDetailsPayload, tx)

      return { organization, bankDetails }
    })
  }
}
