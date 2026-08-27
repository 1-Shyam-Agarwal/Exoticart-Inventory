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
    },
    categories: {
        list: (data) =>
            ipcRenderer.invoke("category:list", data),
        create: (data) =>
            ipcRenderer.invoke("category:create", data),
        update: (data) =>
            ipcRenderer.invoke("category:update", data),
        delete: (data) =>
            ipcRenderer.invoke("category:delete", data)
    },
    brands: {
        list: (data) =>
            ipcRenderer.invoke("brand:list", data),
        create: (data) =>
            ipcRenderer.invoke("brand:create", data),
        update: (data) =>
            ipcRenderer.invoke("brand:update", data),
        delete: (data) =>
            ipcRenderer.invoke("brand:delete", data)
    },
    manufacturers: {
        list: (data) =>
            ipcRenderer.invoke("manufacturer:list", data),
        create: (data) =>
            ipcRenderer.invoke("manufacturer:create", data),
        update: (data) =>
            ipcRenderer.invoke("manufacturer:update", data),
        delete: (data) =>
            ipcRenderer.invoke("manufacturer:delete", data)
    },
    boxTypes: {
        list: (data) =>
            ipcRenderer.invoke("box-type:list", data),
        create: (data) =>
            ipcRenderer.invoke("box-type:create", data),
        update: (data) =>
            ipcRenderer.invoke("box-type:update", data),
        delete: (data) =>
            ipcRenderer.invoke("box-type:delete", data)
    }
})