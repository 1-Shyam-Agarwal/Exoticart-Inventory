import { z } from "zod"
import countries from "../../src/data/country.json" with { type: "json" }
import currencies from "../../src/data/currency.json" with { type: "json" }
import states from "../../src/data/state.json" with { type: "json" }
import timezones from "../../src/data/timezone.json" with { type: "json" }

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
})
