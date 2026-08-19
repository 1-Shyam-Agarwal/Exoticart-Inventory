export default class BankDetailsSerializer {

  static index(payload) {
    if (!payload) return null

    return {
        success : true,
        message : "organisation bank details are entered successfully.",
        data : payload      
    }
  }
}
