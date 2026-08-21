import  { contextBridge , ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld("api", {
    organizationDraft: {
        saveOrganisationIdentity: (data) =>
            ipcRenderer.invoke("organization-draft:save-organisation-identity", data),
        saveOwnerDetails: (data) =>
            ipcRenderer.invoke("organization-draft:save-owner-details", data),
        saveLocation: (data) =>
            ipcRenderer.invoke("organization-draft:save-location", data)
    }
})