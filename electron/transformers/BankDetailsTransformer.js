  export default class BankDetailsTransformer {

    static index(formData) {
      return {
        account_holder_name: formData.accountHolderName,
        bank_name: formData.bankName,
        account_number: formData.accountNumber,
        ifsc_code: formData.ifscCode,
        account_type: formData.accountType,
        upi_id: formData.upiId ?? null,
        qr_path: formData.qrPath ?? null,
      }
    }
  }
