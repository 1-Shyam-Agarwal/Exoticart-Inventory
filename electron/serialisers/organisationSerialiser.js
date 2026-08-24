export default class OrganizationSerialiser {

  serialiseList (activeOrgs , drafts) {

    let structuredActiveOrgs = activeOrgs ?? []
    let structuredDrafts = drafts ?? []

    structuredActiveOrgs = structuredActiveOrgs.map(org => ({...org,status: 'active'}))
    structuredDrafts = structuredDrafts.map(draft => ({
        id: draft.id,
        name: draft.data.name,
        industry: draft.data.industry,
        logoPath: draft.logoPath,
        updatedAt: draft.updatedAt,
        status: 'draft',
        draft
    }))

    return {
        activeOrgs : structuredActiveOrgs,
        drafts : structuredDrafts,
        all : [...structuredActiveOrgs, ...structuredDrafts]
    }
  }
}
