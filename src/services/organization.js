export async function listOrganizations() {
  return window.api.organizations.list()
}

export async function deleteOrganization(id) {
  return window.api.organizations.delete({ id })
}
