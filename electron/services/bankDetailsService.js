import { getDb } from "../db/index.js"
import BankDetailsTransformer from "../transformers/bankDetailsTransformer.js"
import BankDetailsSerializer from "../serialisers/bankDetailsSerialiser.js"


export default class BankDetailsService {
  constructor(db = getDb()) {
    this.db = db
  }

  #insert(payload) {
    const stmt = this.db.prepare(`
      INSERT INTO organization_bank_details (
        organization_id,
        account_holder_name,
        bank_name,
        account_number,
        ifsc_code,
        account_type,
        upi_id,
        qr_path
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    return stmt.run(
      payload.organization_id,
      payload.account_holder_name,
      payload.bank_name,
      payload.account_number,
      payload.ifsc_code,
      payload.account_type,
      payload.upi_id,
      payload.qr_path
    )
  }

  create(organizationId, payload) {
    const bankDetails = {
      organization_id: organizationId,
      ...BankDetailsTransformer.index(payload),
    }

    this.#insert(bankDetails)
    return this.findByOrganizationId(organizationId)
  }

  findByOrganizationId(organizationId) {
    const bankDetails = this.db
      .prepare("SELECT * FROM organization_bank_details WHERE organization_id = ?")
      .get(organizationId)

    return BankDetailsSerializer.index(bankDetails)
  }
}
