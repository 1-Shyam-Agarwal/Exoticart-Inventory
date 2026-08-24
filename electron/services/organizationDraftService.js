import { prisma } from "../../lib/prisma.js"
import { organizationIdentitySchema } from "../../shared/validation/organizationIdentitySchema.js"
import { ownerDetailsSchema } from "../../shared/validation/ownerDetailsSchema.js"
import { locationSchema } from "../../shared/validation/locationSchema.js"
import { businessDetailsSchema } from "../../shared/validation/businessDetailsSchema.js"
import { bankDetailsSchema } from "../../shared/validation/bankDetailsSchema.js"

export default class OrganizationDraftService {
  async createOrgDraft() {
    return prisma.organizationDraft.create({
      data: { currentStep: 1, data: {} },
    })
  }

  async list() {
    return prisma.organizationDraft.findMany({
      orderBy: { updatedAt: "desc" },
    })
  }

  async delete(id) {
    return prisma.organizationDraft.delete({ where: { id } })
  }

  async saveOrganisationIdentity(draftId, fields, logoPath) {
    const existing = await prisma.organizationDraft.findUniqueOrThrow({
      where: { id: draftId },
    })

    return prisma.organizationDraft.update({
      where: { id: draftId },
      data: {
        data: { ...existing.data, ...fields },
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

  async saveLocation(draftId, fields) {
    const existing = await prisma.organizationDraft.findUniqueOrThrow({
      where: { id: draftId },
    })

    return prisma.organizationDraft.update({
      where: { id: draftId },
      data: {
        data: { ...existing.data, ...fields },
        currentStep: 4,
      },
    })
  }

  async saveBusinessDetails(draftId, fields) {
    const existing = await prisma.organizationDraft.findUniqueOrThrow({
      where: { id: draftId },
    })

    return prisma.organizationDraft.update({
      where: { id: draftId },
      data: {
        data: { ...existing.data, ...fields },
        currentStep: 5,
      },
    })
  }

  async saveBankDetails(draftId, fields) {
    const existing = await prisma.organizationDraft.findUniqueOrThrow({
      where: { id: draftId },
    })

    return prisma.organizationDraft.update({
      where: { id: draftId },
      data: {
        data: { ...existing.data, ...fields },
        currentStep: 6,
      },
    })
  }

  async finalize(draftId) {
    const draft = await prisma.organizationDraft.findUniqueOrThrow({
      where: { id: draftId },
    })

    const data = {
      ...draft.data,
      ...(draft.data.inventoryStartDate && {
        inventoryStartDate: new Date(draft.data.inventoryStartDate),
      }),
    }

    const identity = organizationIdentitySchema.parse(data)
    const owner = ownerDetailsSchema.parse(data)
    const location = locationSchema.parse(data)
    const business = businessDetailsSchema.parse(data)
    const bank = bankDetailsSchema.parse(data)

    return prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: identity.name,
          industry: identity.industry,
          logoPath: draft.logoPath,

          currency: location.currency,
          timezone: location.timezone,

          country: location.country,
          state: location.state,

          inventoryStartDate: business.inventoryStartDate,
          fiscalYear: business.fiscalYear,
          pan: business.pan ?? null,
          gst: business.gst ?? null,

          contacts: {
            create: owner.owners.map((contact, contactIndex) => ({
              name: contact.name,
              position: contact.position,
              isPrimary: contactIndex === 0,
              numbers: {
                create: contact.numbers.map((number, numberIndex) => ({
                  countryCode: number.countryCode,
                  mobileNumber: number.mobileNumber,
                  isPrimary: numberIndex === 0,
                })),
              },
              emails: {
                create: contact.emails.map((entry, emailIndex) => ({
                  email: entry.email,
                  isPrimary: emailIndex === 0,
                })),
              },
            })),
          },

          bankDetails: {
            create: bank.bankAccounts.map((account, index) => ({
              accountHolderName: account.accountHolderName,
              bankName: account.bankName,
              accountNumber: account.accountNumber,
              ifscCode: account.ifscCode,
              accountType: account.accountType,
              upiId: account.upiId ?? null,
              qrPath: account.qrPath ?? null,
              isPrimary: index === 0,
            })),
          },
        },
        include: {
          contacts: { include: { numbers: true, emails: true } },
          bankDetails: true,
        },
      })

      await tx.organizationDraft.delete({ where: { id: draftId } })

      return organization
    })
  }
}
