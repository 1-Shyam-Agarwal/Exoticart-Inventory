import { prisma } from "../../lib/prisma.js"

export default class BrandService {
  async list(organizationId) {
    return prisma.brand.findMany({
      where: { organizationId },
      orderBy: { brand: "asc" },
    })
  }

  async create({ organizationId, brand }) {
    return prisma.brand.create({
      data: { organizationId, brand },
    })
  }

  async update({ id, brand }) {
    return prisma.brand.update({ where: { id }, data: { brand } })
  }

  async delete(id) {
    return prisma.brand.delete({ where: { id } })
  }
}
