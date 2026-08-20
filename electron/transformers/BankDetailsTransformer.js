export default class BankDetailsTransformer {

  static index(formData) {
    return {
      accountHolderName: formData.accountHolderName,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      accountType: formData.accountType,
      upiId: formData.upiId ?? null,
      qrPath: formData.qrPath ?? null,
      isPrimary: true,
    }
  }
}
