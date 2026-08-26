export async function listUnits(organizationId) {
  return window.api.units.list({ organizationId })
}

export async function createUnit({ organizationId, unit }) {
  return window.api.units.create({ organizationId, unit })
}

export async function deleteUnit(id) {
  return window.api.units.delete({ id })
}
