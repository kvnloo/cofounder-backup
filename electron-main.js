const { app, BrowserWindow, systemPreferences } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#11333B' // Aquamarine dark base
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5200'
      : `file://${path.join(__dirname, 'dist/index.html')}`
  )

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  systemPreferences.setAppLevelAppearance('dark')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})