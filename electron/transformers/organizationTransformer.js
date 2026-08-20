export default class OrganizationTransformer {

  static index(formData) {
    return {
      name: formData.name,
      industry: formData.industry,
      logoPath: formData.logoPath ?? null,

      currency: formData.currency,
      timezone: formData.timezone,

      inventoryStartDate: formData.inventoryStartDate,
      fiscalYear: formData.fiscalYear,
      pan: formData.pan ?? null,
      gst: formData.gst ?? null,

      contacts: {
        create: [
          {
            name: formData.ownerName,
            // The form only collects a single owner today, with no "position"
            // field. Hardcoded until multi-contact UI collects it explicitly.
            position: "Owner",
            isPrimary: true,
            numbers: {
              create: [
                {
                  countryCode: formData.countryCode,
                  mobileNumber: formData.mobileNumber,
                  isPrimary: true,
                },
              ],
            },
            emails: formData.email
              ? { create: [{ email: formData.email, isPrimary: true }] }
              : undefined,
          },
        ],
      },

      addresses: {
        create: [
          {
            // The form only collects one address today, with no "name" or
            // "addressType" field. Hardcoded until multi-address UI collects them.
            name: "Head Office",
            addressType: "head_office",
            country: formData.country,
            state: formData.state,
            city: formData.city ?? null,
            street1: formData.street1 ?? null,
            street2: formData.street2 ?? null,
            postalCode: formData.postalCode ?? null,
            isPrimary: true,
          },
        ],
      },
    }
  }
}
