  export default class OrganizationTransformer {

    static index(formData) {
      return {
        name: formData.name,
        industry: formData.industry,
        logo_path: formData.logoPath ?? null,

        owner_name: formData.ownerName,
        owner_country_code: formData.countryCode,
        owner_mobile_number: formData.mobileNumber,
        owner_email: formData.email,

        country: formData.country,
        state: formData.state,
        currency: formData.currency,
        timezone: formData.timezone,
        street1: formData.street1 ?? null,
        street2: formData.street2 ?? null,
        city: formData.city ?? null,
        postal_code: formData.postalCode ?? null,

        inventory_start_date: formData.inventoryStartDate,
        fiscal_year: formData.fiscalYear,
        pan: formData.pan ?? null,
        gst: formData.gst ?? null,
      }
    }
}
