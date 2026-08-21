import { z } from "zod"
import { organizationIdentitySchema as sharedOrganizationIdentitySchema } from "../../shared/validation/organizationIdentitySchema"
import { ownerDetailsSchema as sharedOwnerDetailsSchema } from "../../shared/validation/ownerDetailsSchema"
import { locationSchema as sharedLocationSchema } from "../../shared/validation/locationSchema"
import { businessDetailsSchema as sharedBusinessDetailsSchema } from "../../shared/validation/businessDetailsSchema"
import { bankDetailsSchema as sharedBankDetailsSchema } from "../../shared/validation/bankDetailsSchema"

export const organizationIdentitySchema = sharedOrganizationIdentitySchema.extend({
  logoFile: z
    .file()
    .min(1000, "Logo file must be at least 1Kb")
    .max(10000000, "Logo file must be 10MB or less")
    .optional(),
})

export const ownerDetailsSchema = sharedOwnerDetailsSchema

export const locationSchema = sharedLocationSchema

export const businessDetailsSchema = sharedBusinessDetailsSchema

export const bankDetailsSchema = sharedBankDetailsSchema.extend({
  qrFile: z
    .file()
    .min(1000, "QR code file must be at least 1Kb")
    .max(10000000, "QR code file must be 10Mb or less")
    .optional(),
})
