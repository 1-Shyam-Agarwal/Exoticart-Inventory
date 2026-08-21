import { z } from "zod"
import fiscalYears from "../../src/data/fiscalYear.json" with { type: "json" }

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
