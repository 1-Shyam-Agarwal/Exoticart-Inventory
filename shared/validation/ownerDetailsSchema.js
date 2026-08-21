import { z } from "zod"

export const ownerDetailsSchema = z.object({
  ownerName: z
    .string()
    .trim()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name must be 100 characters or fewer"),
  countryCode: z.string().min(1, "Country code is required"),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  email: z.email("Enter a valid email address"),
})
