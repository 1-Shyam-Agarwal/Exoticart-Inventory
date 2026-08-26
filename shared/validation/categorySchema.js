import { z } from "zod"
import { IdSchema } from "./idSchema.js"

export const categoryListSchema = z.object({
  organizationId: IdSchema,
})

export const categoryCreateSchema = z.object({
  organizationId: IdSchema,
  category: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(50, "Max 50 characters allowed"),
})

export const categoryDeleteSchema = z.object({
  id: IdSchema,
})
