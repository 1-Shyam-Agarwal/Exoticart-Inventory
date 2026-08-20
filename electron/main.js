import { app, BrowserWindow , ipcMain } from "electron"
import path from "node:path"
import { initDb } from "./db/index.js"

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
    'organisation:store',
    (_event, data) => OrganisationController.store(data)
  )

  initDb()
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