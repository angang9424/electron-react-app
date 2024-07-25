const { contextBridge, ipcRenderer } = require('electron');

// Expose a closeApp method to the renderer process via the window object
contextBridge.exposeInMainWorld('api', {
	closeApp: () => ipcRenderer.send('close-app')
});