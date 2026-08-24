import { prisma } from "../../lib/prisma.js"

export default class OrganizationService {
  async list() {
    return prisma.organization.findMany({
      orderBy: { updatedAt: "desc" },
    })
  }

  async findById(id) {
    return prisma.organization.findUniqueOrThrow({
      where: { id },
      include: {
        contacts: { include: { numbers: true, emails: true } },
        bankDetails: true,
      },
    })
  }

  async delete(id) {
    return prisma.organization.delete({ where: { id } })
  }
}
