export async function listCategories(organizationId) {
  return window.api.categories.list({ organizationId })
}

export async function createCategory({ organizationId, category }) {
  return window.api.categories.create({ organizationId, category })
}

export async function updateCategory({ id, category }) {
  return window.api.categories.update({ id, category })
}

export async function deleteCategory(id) {
  return window.api.categories.delete({ id })
}

export async function listBrands(organizationId) {
  return window.api.brands.list({ organizationId })
}

export async function createBrand({ organizationId, brand }) {
  return window.api.brands.create({ organizationId, brand })
}

export async function updateBrand({ id, brand }) {
  return window.api.brands.update({ id, brand })
}

export async function deleteBrand(id) {
  return window.api.brands.delete({ id })
}

export async function listManufacturers(organizationId) {
  return window.api.manufacturers.list({ organizationId })
}

export async function createManufacturer({ organizationId, manufacturer }) {
  return window.api.manufacturers.create({ organizationId, manufacturer })
}

export async function updateManufacturer({ id, manufacturer }) {
  return window.api.manufacturers.update({ id, manufacturer })
}

export async function deleteManufacturer(id) {
  return window.api.manufacturers.delete({ id })
}

export async function listBoxTypes(organizationId) {
  return window.api.boxTypes.list({ organizationId })
}

export async function createBoxType({ organizationId, name, numberOfItems }) {
  return window.api.boxTypes.create({ organizationId, name, numberOfItems })
}

export async function updateBoxType({ id, name, numberOfItems }) {
  return window.api.boxTypes.update({ id, name, numberOfItems })
}

export async function deleteBoxType(id) {
  return window.api.boxTypes.delete({ id })
}
