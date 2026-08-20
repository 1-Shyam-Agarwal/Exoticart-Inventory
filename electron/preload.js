import  { contextBridge , ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld("api", {
    organization: {
        store: (data) =>
            ipcRenderer.invoke("organization:store", data)
    }
})