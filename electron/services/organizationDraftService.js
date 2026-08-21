import { prisma } from "../../lib/prisma.js"

export default class OrganizationDraftService {
  async createOrgDraft() {
    return prisma.organizationDraft.create({
      data: { currentStep: 1, data: {} },
    })
  }

  async saveOrganisationIdentity(draftId, fields, logoPath) {
    return prisma.organizationDraft.update({
      where: { id: draftId },
      data: {
        data: fields,
        currentStep: 2,
        ...(logoPath && { logoPath }),
      },
    })
  }

  async saveOwnerDetails(draftId, fields) {
    const existing = await prisma.organizationDraft.findUniqueOrThrow({
      where: { id: draftId },
    })

    return prisma.organizationDraft.update({
      where: { id: draftId },
      data: {
        data: { ...existing.data, ...fields },
        currentStep: 3,
      },
    })
  }
}
