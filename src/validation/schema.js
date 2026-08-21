import { z } from "zod"
import fiscalYears from "../data/fiscalYear.json"
import { organizationIdentitySchema as sharedOrganizationIdentitySchema } from "../../shared/validation/organizationIdentitySchema"
import { ownerDetailsSchema as sharedOwnerDetailsSchema } from "../../shared/validation/ownerDetailsSchema"
import { locationSchema as sharedLocationSchema } from "../../shared/validation/locationSchema"

export const organizationIdentitySchema = sharedOrganizationIdentitySchema.extend({
  logoFile: z
    .file()
    .min(1000, "Logo file must be at least 1Kb")
    .max(10000000, "Logo file must be 10MB or less")
    .optional(),
})

export const ownerDetailsSchema = sharedOwnerDetailsSchema

export const locationSchema = sharedLocationSchema

function isNotFutureDate(date) {
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)
  return date.getTime() <= endOfToday.getTime()
}

export const businessDetailsSchema = z.object({
  inventoryStartDate: z
    .date({ error: "Inventory start date is required" })
    .refine(isNotFutureDate, {
      message: "Inventory start date cannot be in the future",
    }),
  fiscalYear: z.enum(fiscalYears, {
    message: "Select a valid fiscal year",
  }),
  pan: z.string().trim().max(10, "PAN must be 10 characters or fewer").optional(),
  gst: z.string().trim().max(15, "GST must be 15 characters or fewer").optional(),
})

export const bankDetailsSchema = z.object({
  accountHolderName: z
    .string()
    .trim()
    .min(2, "Account holder name must be at least 2 characters")
    .max(100, "Account holder name must be 100 characters or fewer"),
  bankName: z
    .string()
    .trim()
    .min(2, "Bank name must be at least 2 characters")
    .max(100, "Bank name must be 100 characters or fewer"),
  accountNumber: z
    .string()
    .trim()
    .min(9, "Should have at least 9 characters"),
  ifscCode: z
    .string()
    .trim()
    .min(11, "Should have at least 11 characters"),
  accountType: z.enum(["savings", "current"], {
    message: "Select an account type",
  }),
  upiId: z.string().trim().max(50, "UPI ID must be 50 characters or fewer").optional(),
  qrFile: z
    .file()
    .min(1000, "QR code file must be at least 1Kb")
    .max(10000000, "QR code file must be 10Mb or less")
    .optional(),
})
