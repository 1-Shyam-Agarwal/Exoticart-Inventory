import { z } from "zod"

export const bankDetailsSchema = z.object({
  accountHolderName: z
    .string()
    .trim()
    .min(2, "Account holder name must be at least 2 characters")
    .max(100, "Account holder name must be 100 characters or fewer"),
  bankName: z
    .string()
    .trim()
    .min(2, "Bank name must be at least 2 characters")
    .max(100, "Bank name must be 100 characters or fewer"),
  accountNumber: z
    .string()
    .trim()
    .min(9, "Should have at least 9 characters"),
  ifscCode: z
    .string()
    .trim()
    .min(11, "Should have at least 11 characters"),
  accountType: z.enum(["savings", "current"], {
    message: "Select an account type",
  }),
  upiId: z.string().trim().max(50, "UPI ID must be 50 characters or fewer").optional(),
})
