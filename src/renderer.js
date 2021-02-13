import { ipcRenderer } from "electron";

export const closeWindow = () => {
    // BrowserWindow.close()
    ipcRenderer.send('close-window')
}

export const maximizeWindow = () => {
    ipcRenderer.send('maximize-window')
}

export const minimizeWindow = () => {
    ipcRenderer.send('minimize-window')
}