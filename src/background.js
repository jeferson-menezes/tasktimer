'use strict'
import { app, BrowserWindow, ipcMain, protocol, remote, Menu, shell } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win = null

async function createWindow() {
  console.log('---------------------', __dirname);
  console.log(path.join(path.parse(__dirname).dir, 'preload.js'));
  win = new BrowserWindow({
    width: 400,
    height: 600,
    frame: true,
    // titleBarStyle: "hidden", // add this li
    webPreferences: {
      // preload: path.join(path.parse(__dirname).dir, 'src/preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true//process.env.ELECTRON_NODE_INTEGRATION

    },

  })

  win.removeMenu()

  if (process.env.WEBPACK_DEV_SERVER_URL) {

    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)

    // if (!process.env.IS_TEST) win.webContents.openDevTools()

  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}


ipcMain.on('open-link', (event, link) => {
  shell.openExternal(link)
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

ipcMain.on('close-window', (event, args) => {
  const window = BrowserWindow.getFocusedWindow()
  window.hide()  // win.close()
  app.quit()
})

ipcMain.on('minimize-window', (event, args) => {
  const window = BrowserWindow.getFocusedWindow()
  window.maximize()
})

ipcMain.on('maximize-window', (event, args) => {
  const window = BrowserWindow.getFocusedWindow()
  window.minimize()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}