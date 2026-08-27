import { prisma } from "../../lib/prisma.js"

export default class ManufacturerService {
  async list(organizationId) {
    return prisma.manufacturer.findMany({
      where: { organizationId },
      orderBy: { manufacturer: "asc" },
    })
  }

  async create({ organizationId, manufacturer }) {
    return prisma.manufacturer.create({
      data: { organizationId, manufacturer },
    })
  }

  async update({ id, manufacturer }) {
    return prisma.manufacturer.update({ where: { id }, data: { manufacturer } })
  }

  async delete(id) {
    return prisma.manufacturer.delete({ where: { id } })
  }
}
