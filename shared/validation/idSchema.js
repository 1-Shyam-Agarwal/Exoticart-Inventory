import { z } from "zod"

export const IdSchema = z.coerce
  .number({ message: "A valid Id is required" })
  .int()
  .positive("Id should be positive only.")
