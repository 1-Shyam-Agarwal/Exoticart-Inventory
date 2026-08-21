import  { contextBridge , ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld("api", {
    organizationDraft: {
        saveOrganisationIdentity: (data) =>
            ipcRenderer.invoke("organization-draft:save-organisation-identity", data)
    }
})