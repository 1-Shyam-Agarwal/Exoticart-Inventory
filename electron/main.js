import { app, BrowserWindow , ipcMain } from "electron"
import path from "node:path"
import OrganizationDraftController from "./controllers/organizationDraftController.js"

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