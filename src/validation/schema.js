import { z } from "zod"
import countries from "../data/country.json"
import currencies from "../data/currency.json"
import states from "../data/state.json"
import timezones from "../data/timezone.json"
import fiscalYears from "../data/fiscalYear.json"

export const organizationIdentitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(150, "Organization name must be 150 characters or fewer"),
  industry: z.string().min(1, "Industry is required"),
  logoFile: z
    .file()
    .min(1000, "Logo file must be at least 1Kb")
    .max(10000000, "Logo file must be 10MB or less")
    .optional(),
})

export const ownerDetailsSchema = z.object({
  ownerName: z
    .string()
    .trim()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name must be 100 characters or fewer"),
  countryCode: z.string().min(1, "Country code is required"),
  mobileNumber: z.e164("Enter a valid mobile number"),
  email: z.email("Enter a valid email address"),
})

export const locationSchema = z.object({
  country: z.enum(countries, {
    message: "Select a valid country",
  }),
  state: z.enum(states, {
    message: "Select a valid state / union territory",
  }),
  currency: z.enum(currencies, {
    message: "Select a valid currency",
  }),
  timezone: z.enum(timezones, {
    message: "Select a valid timezone",
  }),
  street1: z.string().trim().max(300, "Street 1 must be 300 characters or fewer").optional(),
  street2: z.string().trim().max(300, "Street 2 must be 300 characters or fewer").optional(),
  city: z.string().trim().max(100, "City must be 100 characters or fewer").optional(),
  postalCode: z.string().trim().max(10, "ZIP / Postal Code must be 10 characters or fewer").optional(),
})

export const businessDetailsSchema = z.object({
  inventoryStartDate: z.date().max(new Date(), "Invalid Date"),
  fiscalYear: z.enum(fiscalYears, {
    message: "Select a valid fiscal year",
  }),
  pan: z
    .string()
    .trim()
    .min(10, "Should have at least 10 characters")
    .optional(),
  gst: z
    .string()
    .trim()
    .min(10, "Should have at least 10 characters")
    .optional(),
})

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
  accountType: z.enum(["savings", "current"]),
  upiId: z
    .string()
    .trim()
    .min(5, "Should have at least 5 characters")
    .optional(),
  qrFile: z
    .file()
    .min(1000, "QR code file must be at least 1Kb")
    .max(10000000, "QR code file must be 10Mb or less")
    .optional(),
})
