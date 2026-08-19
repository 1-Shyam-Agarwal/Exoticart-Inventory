export default class OrganizationSerializer {

  static index(payload) {
    if (!payload) return null

    return {
      success : true,
      message : "Organisation created successfully",
      data : payload
    }
  }

}
