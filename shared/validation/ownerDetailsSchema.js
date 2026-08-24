import { z } from "zod"

export const ownerNumberSchema = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
})

export const ownerEmailSchema = z.object({
  email: z.email("Enter a valid email address"),
})

export const ownerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Stakeholder name must be at least 2 characters")
    .max(100, "Stakeholder name must be 100 characters or fewer"),
  position: z
    .string()
    .trim()
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be 100 characters or fewer"),
  numbers: z
    .array(ownerNumberSchema)
    .min(1, "At least one mobile number is required"),
  emails: z
    .array(ownerEmailSchema)
    .min(1, "At least one email address is required"),
})

export const ownerDetailsSchema = z.object({
  owners: z.array(ownerSchema).min(1, "At least one stakeholder is required"),
})
