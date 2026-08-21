import { z } from "zod"

export const organizationIdentitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(150, "Organization name must be 150 characters or fewer"),
  industry: z.string().min(1, "Industry is required"),
})
