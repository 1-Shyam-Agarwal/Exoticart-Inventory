import { z } from "zod"
import OrganizationDraftService from "../services/organizationDraftService.js"
import OrganizationDraftValidator from "../validators/organizationDraftValidator.js"
import FileStorageService from "../services/fileStorageService.js"

export default class OrganizationDraftController {
  constructor(draftService = new OrganizationDraftService()) {
    this.draftService = draftService
  }

  async list() {
    try {
      const drafts = await this.draftService.list()

      return { success: true, drafts }
    } catch (error) {
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async saveOrganisationIdentity({ data }) {
    try {
      const logoPath = FileStorageService.saveLogo(data.logo) ?? undefined
      const fields = OrganizationDraftValidator.validateOrganisationIdentity({
        name: data.name,
        industry: data.industry,
      })

      //Service Layer
      const isDraftIdPresent = Boolean(data?.draftId)
      let draftId = data?.draftId

      if(!isDraftIdPresent){
        const newOrg = await this.draftService.createOrgDraft()
        draftId = newOrg.id
      }

      const updated = await this.draftService.saveOrganisationIdentity(draftId, fields, logoPath)

      //Serialiser Layer
      return { success: true, draft: updated }

    } catch (error) {
      console.log("Error : " , error.message)
      if (error instanceof z.ZodError) {
        return { 
          success: false, 
          message: error?.message ?? "Invalid organization identity data" 
        }
      }
      return {
        success:false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async saveOwnerDetails({ data }) {
    try {
      const fields = OrganizationDraftValidator.validateOwnerDetails({
        owners: data.owners,
      })

      let draftId = data?.draftId

      const updated = await this.draftService.saveOwnerDetails(draftId, fields)

      return { success: true, draft: updated }

    } catch (error) {
  
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: error?.message ?? "Invalid owner details data"
        }
      }
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async saveLocation({ data }) {
    try {
      const fields = OrganizationDraftValidator.validateLocation({
        country: data.country,
        state: data.state,
        currency: data.currency,
        timezone: data.timezone,
      })

      let draftId = data?.draftId

      const updated = await this.draftService.saveLocation(draftId, fields)

      return { success: true, draft: updated }

    } catch (error) {

      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: error?.message ?? "Invalid location data"
        }
      }
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async saveBusinessDetails({ data }) {
    try {
      const fields = OrganizationDraftValidator.validateBusinessDetails({
        inventoryStartDate: data.inventoryStartDate,
        fiscalYear: data.fiscalYear,
        pan: data.pan,
        gst: data.gst,
      })

      let draftId = data?.draftId

      const updated = await this.draftService.saveBusinessDetails(draftId, fields)

      return { success: true, draft: updated }

    } catch (error) {

      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: error?.message ?? "Invalid business details data"
        }
      }
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async saveBankDetails({ data }) {
    try {
      const bankAccounts = (data.bankAccounts || []).map((account) => ({
        ...account,
        qrPath: FileStorageService.saveQrCode(account.qr) ?? undefined,
      }))

      const fields = OrganizationDraftValidator.validateBankDetails({
        bankAccounts,
      })

      let draftId = data?.draftId

      const updated = await this.draftService.saveBankDetails(draftId, fields)

      return { success: true, draft: updated }

    } catch (error) {

      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: error?.message ?? "Invalid bank details data"
        }
      }
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async delete({ data }) {
    try {
      await this.draftService.delete(data.draftId)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }

  async finalize({ data }) {
    try {
      const draftId = data?.draftId
      if (!draftId) {
        return { success: false, message: "Missing draftId" }
      }

      const organization = await this.draftService.finalize(draftId)

      return { success: true, organization }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: error?.message ?? "Draft is missing required data",
        }
      }
      return {
        success: false,
        message: error?.message ?? "Internal Server Error",
      }
    }
  }
}
