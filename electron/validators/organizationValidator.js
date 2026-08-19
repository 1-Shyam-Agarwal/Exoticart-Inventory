import { z } from "zod"

const organizationSchema = z.object({
  name: z.string().trim().min(2).max(150),
  industry: z.string().trim().min(1),

  ownerName: z.string().trim().min(2).max(100),
  countryCode: z.string().trim().min(1),
  mobileNumber: z.string().trim().regex(/^\d{10}$/, "Must be a 10-digit mobile number"),
  email: z.email(),

  country: z.string().trim().min(1),
  state: z.string().trim().min(1),
  currency: z.string().trim().min(1),
  timezone: z.string().trim().min(1),
  street1: z.string().trim().max(300).optional(),
  street2: z.string().trim().max(300).optional(),
  city: z.string().trim().max(100).optional(),
  postalCode: z.string().trim().max(10).optional(),

  inventoryStartDate: z.coerce
    .date()
    .refine((date) => date.getTime() <= Date.now(), "inventoryStartDate cannot be in the future"),
  fiscalYear: z.string().trim().min(1),
  pan: z.string().trim().min(10).optional(),
  gst: z.string().trim().min(10).optional(),
})

export default class OrganizationValidator {
  static schema = organizationSchema

  static validate(data) {
    return organizationSchema.parse(data)
  }

  static async validateAsync(data) {
    return organizationSchema.parseAsync(data)
  }
}
