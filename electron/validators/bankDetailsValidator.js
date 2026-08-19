import { z } from "zod"

// Backend-owned validation for the `organization_bank_details` table —
// self-contained, same reasoning as OrganizationValidator.
const bankDetailsSchema = z.object({
  accountHolderName: z.string().trim().min(2).max(100),
  bankName: z.string().trim().min(2).max(100),
  accountNumber: z.string().trim().min(9),
  ifscCode: z.string().trim().min(11),
  accountType: z.enum(["savings", "current"]),
  upiId: z.string().trim().min(5).optional(),
})

export default class BankDetailsValidator {
  static schema = bankDetailsSchema

  static validate(data) {
    return bankDetailsSchema.parse(data)
  }

  static async validateAsync(data) {
    return bankDetailsSchema.parseAsync(data)
  }
}
