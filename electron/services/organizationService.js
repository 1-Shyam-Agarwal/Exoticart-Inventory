import { getPrismaClient } from "../db/index.js"
import OrganizationTransformer from "../transformers/organizationTransformer.js"
import OrganizationSerializer from "../serialisers/organizationSerialiser.js"

const includeGraph = {
  contacts: { include: { numbers: true, emails: true } },
  addresses: true,
}

export default class OrganizationService {
  constructor(prisma = getPrismaClient()) {
    this.prisma = prisma
  }

  async create(payload, client = this.prisma) {
    const data = OrganizationTransformer.index(payload)
    const organization = await client.organization.create({
      data,
      include: includeGraph,
    })

    return OrganizationSerializer.index(organization)
  }

  async findById(id, client = this.prisma) {
    const organization = await client.organization.findUnique({
      where: { id },
      include: includeGraph,
    })

    return OrganizationSerializer.index(organization)
  }
}
