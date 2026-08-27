import { z } from "zod"
import { IdSchema } from "./idSchema.js"

export const manufacturerListSchema = z.object({
  organizationId: IdSchema,
})

export const manufacturerCreateSchema = z.object({
  organizationId: IdSchema,
  manufacturer: z
    .string()
    .trim()
    .min(1, "Manufacturer name is required")
    .max(50, "Max 50 characters allowed"),
})

export const manufacturerDeleteSchema = z.object({
  id: IdSchema,
})
