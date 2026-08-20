import { getPrismaClient } from "../db/index.js"
import BankDetailsTransformer from "../transformers/bankDetailsTransformer.js"
import BankDetailsSerializer from "../serialisers/bankDetailsSerialiser.js"

export default class BankDetailsService {
  constructor(prisma = getPrismaClient()) {
    this.prisma = prisma
  }

  async create(organizationId, payload, client = this.prisma) {
    const data = { organizationId, ...BankDetailsTransformer.index(payload) }
    const bankDetail = await client.organizationBankDetail.create({ data })

    return BankDetailsSerializer.index(bankDetail)
  }

  async findByOrganizationId(organizationId, client = this.prisma) {
    const bankDetail = await client.organizationBankDetail.findFirst({
      where: { organizationId },
    })

    return BankDetailsSerializer.index(bankDetail)
  }
}
