import { z } from "zod"
import countries from "../data/country.json"
import currencies from "../data/currency.json"
import states from "../data/state.json"
import timezones from "../data/timezone.json"
import fiscalYears from "../data/fiscalYear.json"
import { organizationIdentitySchema as sharedOrganizationIdentitySchema } from "../../shared/validation/organizationIdentitySchema"

const emptyToUndefined = (value) =>
  value === "" || value == null ? undefined : value

const optionalTrimmedString = (schema) =>
  z.preprocess(emptyToUndefined, schema.optional())

export const organizationIdentitySchema = sharedOrganizationIdentitySchema.extend({
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
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
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
  street1: optionalTrimmedString(
    z.string().trim().max(300, "Street 1 must be 300 characters or fewer"),
  ),
  street2: optionalTrimmedString(
    z.string().trim().max(300, "Street 2 must be 300 characters or fewer"),
  ),
  city: optionalTrimmedString(
    z.string().trim().max(100, "City must be 100 characters or fewer"),
  ),
  postalCode: optionalTrimmedString(
    z.string().trim().max(10, "ZIP / Postal Code must be 10 characters or fewer"),
  ),
})

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
  pan: optionalTrimmedString(
    z.string().trim().min(10, "Should have at least 10 characters"),
  ),
  gst: optionalTrimmedString(
    z.string().trim().min(10, "Should have at least 10 characters"),
  ),
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
  accountType: z.enum(["savings", "current"], {
    message: "Select an account type",
  }),
  upiId: optionalTrimmedString(
    z.string().trim().min(5, "Should have at least 5 characters"),
  ),
  qrFile: z
    .file()
    .min(1000, "QR code file must be at least 1Kb")
    .max(10000000, "QR code file must be 10Mb or less")
    .optional(),
})
