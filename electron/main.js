import { app, BrowserWindow , ipcMain} from "electron"
import path from "node:path"
import OrganizationDraftController from "./controllers/organizationDraftController.js"
import OrganizationController from "./controllers/organizationController.js"
import CategoryController from "./controllers/categoryController.js"
import BrandController from "./controllers/brandController.js"
import ManufacturerController from "./controllers/manufacturerController.js"
import BoxTypeController from "./controllers/boxTypeController.js"

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

  ipcMain.handle(
    'organization-draft:finalize',
    (_event, data) => new OrganizationDraftController().finalize({ data })
  )

  ipcMain.handle(
    'organization-draft:delete',
    (_event, data) => new OrganizationDraftController().delete({ data })
  )

  ipcMain.handle(
    'organization:list',
    () => new OrganizationController().list()
  )

  ipcMain.handle(
    'organization:show',
    (_event, data) => new OrganizationController().show({ data })
  )

  ipcMain.handle(
    'organization:delete',
    (_event, data) => new OrganizationController().delete({ data })
  )

  ipcMain.handle(
    'category:list',
    (_event, data) => new CategoryController().list({ data })
  )

  ipcMain.handle(
    'category:create',
    (_event, data) => new CategoryController().create({ data })
  )

  ipcMain.handle(
    'category:delete',
    (_event, data) => new CategoryController().delete({ data })
  )

  ipcMain.handle(
    'brand:list',
    (_event, data) => new BrandController().list({ data })
  )

  ipcMain.handle(
    'brand:create',
    (_event, data) => new BrandController().create({ data })
  )

  ipcMain.handle(
    'brand:delete',
    (_event, data) => new BrandController().delete({ data })
  )

  ipcMain.handle(
    'manufacturer:list',
    (_event, data) => new ManufacturerController().list({ data })
  )

  ipcMain.handle(
    'manufacturer:create',
    (_event, data) => new ManufacturerController().create({ data })
  )

  ipcMain.handle(
    'manufacturer:delete',
    (_event, data) => new ManufacturerController().delete({ data })
  )

  ipcMain.handle(
    'box-type:list',
    (_event, data) => new BoxTypeController().list({ data })
  )

  ipcMain.handle(
    'box-type:create',
    (_event, data) => new BoxTypeController().create({ data })
  )

  ipcMain.handle(
    'box-type:delete',
    (_event, data) => new BoxTypeController().delete({ data })
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