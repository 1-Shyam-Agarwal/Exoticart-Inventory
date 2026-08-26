import { prisma } from "../../lib/prisma.js"

export default class CategoryService {
  async list(organizationId) {
    return prisma.category.findMany({
      where: { organizationId },
      orderBy: { category: "asc" },
    })
  }

  async create({ organizationId, category }) {
    return prisma.category.create({
      data: { organizationId, category },
    })
  }

  async delete(id) {
    return prisma.category.delete({ where: { id } })
  }
}
