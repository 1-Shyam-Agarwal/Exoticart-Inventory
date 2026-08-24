import  { contextBridge , ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld("api", {
    organizationDraft: {
        list: () =>
            ipcRenderer.invoke("organization-draft:list"),
        saveOrganisationIdentity: (data) =>
            ipcRenderer.invoke("organization-draft:save-organisation-identity", data),
        saveOwnerDetails: (data) =>
            ipcRenderer.invoke("organization-draft:save-owner-details", data),
        saveLocation: (data) =>
            ipcRenderer.invoke("organization-draft:save-location", data),
        saveBusinessDetails: (data) =>
            ipcRenderer.invoke("organization-draft:save-business-details", data),
        saveBankDetails: (data) =>
            ipcRenderer.invoke("organization-draft:save-bank-details", data),
        finalize: (data) =>
            ipcRenderer.invoke("organization-draft:finalize", data),
        delete: (data) =>
            ipcRenderer.invoke("organization-draft:delete", data)
    },
    organizations: {
        list: () =>
            ipcRenderer.invoke("organization:list"),
        show: (data) =>
            ipcRenderer.invoke("organization:show", data),
        delete: (data) =>
            ipcRenderer.invoke("organization:delete", data)
    }
})