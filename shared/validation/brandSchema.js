import { z } from "zod"
import { IdSchema } from "./idSchema.js"

export const brandListSchema = z.object({
  organizationId: IdSchema,
})

export const brandCreateSchema = z.object({
  organizationId: IdSchema,
  brand: z
    .string()
    .trim()
    .min(1, "Brand name is required")
    .max(50, "Max 50 characters allowed"),
})

export const brandDeleteSchema = z.object({
  id: IdSchema,
})
