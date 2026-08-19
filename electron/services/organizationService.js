import { getDb } from "../db/index.js"
import OrganizationTransformer from "../transformers/organizationTransformer.js"
import OrganizationSerializer from "../serialisers/organizationSerialiser.js"


export default class OrganizationService {
  constructor(db = getDb()) {
    this.db = db
  }

  #insert(payload) {
    const stmt = this.db.prepare(`
      INSERT INTO organizations (
        name,
        industry,
        logo_path,
        owner_name,
        owner_country_code,
        owner_mobile_number,
        owner_email,
        country,
        state,
        currency,
        timezone,
        street1,
        street2,
        city,
        postal_code,
        inventory_start_date,
        fiscal_year,
        pan,
        gst
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    return stmt.run(
      payload.name,
      payload.industry,
      payload.logo_path,
      payload.owner_name,
      payload.owner_country_code,
      payload.owner_mobile_number,
      payload.owner_email,
      payload.country,
      payload.state,
      payload.currency,
      payload.timezone,
      payload.street1,
      payload.street2,
      payload.city,
      payload.postal_code,
      payload.inventory_start_date,
      payload.fiscal_year,
      payload.pan,
      payload.gst,
    )
  }

  create(payload) {
    const organisationDetails = OrganizationTransformer.index(payload)
    const result = this.#insert(organisationDetails)
    return this.findById(result.lastInsertRowid)
  }

  findById(id) {
    const organisationDetails = this.db
      .prepare("SELECT * FROM organizations WHERE id = ?")
      .get(id)

    return OrganizationSerializer.index(organisationDetails)
  }
}
