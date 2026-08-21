import { z } from "zod"
import OrganizationDraftService from "../services/organizationDraftService.js"
import OrganizationDraftValidator from "../validators/organizationDraftValidator.js"
import FileStorageService from "../services/fileStorageService.js"

export default class OrganizationDraftController {
  constructor(draftService = new OrganizationDraftService()) {
    this.draftService = draftService
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
        ownerName: data.ownerName,
        countryCode: data.countryCode,
        mobileNumber: data.mobileNumber,
        email: data.email,
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
        street1: data.street1,
        street2: data.street2,
        city: data.city,
        postalCode: data.postalCode,
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
      const qrPath = FileStorageService.saveQrCode(data.qr) ?? undefined
      const fields = OrganizationDraftValidator.validateBankDetails({
        accountHolderName: data.accountHolderName,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        ifscCode: data.ifscCode,
        accountType: data.accountType,
        upiId: data.upiId,
      })

      let draftId = data?.draftId

      const updated = await this.draftService.saveBankDetails(draftId, fields, qrPath)

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
}
