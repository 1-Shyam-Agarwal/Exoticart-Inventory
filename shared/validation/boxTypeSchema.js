import { z } from "zod"
import { IdSchema } from "./idSchema.js"

export const boxTypeListSchema = z.object({
  organizationId: IdSchema,
})

export const boxTypeCreateSchema = z.object({
  organizationId: IdSchema,
  name: z
    .string()
    .trim()
    .min(1, "Box type name is required")
    .max(50, "Max 50 characters allowed"),
  numberOfItems: z.coerce
    .number({ message: "Number of items is required" })
    .int()
    .positive("Number of items must be a positive number"),
})

export const boxTypeDeleteSchema = z.object({
  id: IdSchema,
})

export const boxTypeUpdateSchema = z.object({
  id: IdSchema,
  name: z
    .string()
    .trim()
    .min(1, "Box type name is required")
    .max(50, "Max 50 characters allowed"),
  numberOfItems: z.coerce
    .number({ message: "Number of items is required" })
    .int()
    .positive("Number of items must be a positive number"),
})
