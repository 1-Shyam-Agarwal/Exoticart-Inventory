import { app, BrowserWindow , ipcMain, protocol, net } from "electron"
import path from "node:path"
import { pathToFileURL } from "node:url"
import OrganizationDraftController from "./controllers/organizationDraftController.js"

// Not `standard`: an absolute Windows path (drive letter + backslashes) doesn't
// survive authority/host URL parsing intact (case-folding, backslash handling).
// Keeping this scheme opaque (no "//") preserves the encoded path byte-for-byte.
protocol.registerSchemesAsPrivileged([
  {
    scheme: "local-resource",
    privileges: {
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      bypassCSP: true,
    },
  },
])

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(import.meta.dirname, 'preload.js'),
      sandbox: false
    }
  })

  win.loadURL('http://localhost:5173')
}

app.whenReady().then(() => {

  protocol.handle("local-resource", (request) => {
    const filePath = decodeURIComponent(request.url.slice("local-resource:".length))
    return net.fetch(pathToFileURL(filePath).toString())
  })

  ipcMain.handle(
    'organization-draft:list',
    () => new OrganizationDraftController().list()
  )

  ipcMain.handle(
    'organization-draft:save-organisation-identity',
    (_event, data) => new OrganizationDraftController().saveOrganisationIdentity({ data })
  )

  ipcMain.handle(
    'organization-draft:save-owner-details',
    (_event, data) => new OrganizationDraftController().saveOwnerDetails({ data })
  )

  ipcMain.handle(
    'organization-draft:save-location',
    (_event, data) => new OrganizationDraftController().saveLocation({ data })
  )

  ipcMain.handle(
    'organization-draft:save-business-details',
    (_event, data) => new OrganizationDraftController().saveBusinessDetails({ data })
  )

  ipcMain.handle(
    'organization-draft:save-bank-details',
    (_event, data) => new OrganizationDraftController().saveBankDetails({ data })
  )

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})