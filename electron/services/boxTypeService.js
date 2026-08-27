import { prisma } from "../../lib/prisma.js"

export default class BoxTypeService {
  async list(organizationId) {
    return prisma.boxType.findMany({
      where: { organizationId },
      orderBy: { name: "asc" },
    })
  }

  async create({ organizationId, name, numberOfItems }) {
    return prisma.boxType.create({
      data: { organizationId, name, numberOfItems },
    })
  }

  async delete(id) {
    return prisma.boxType.delete({ where: { id } })
  }
}
