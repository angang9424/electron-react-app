const { app, BrowserWindow, ipcMain, contextBridge, ipcRenderer  } = require('electron');
const path = require('path');
const isDev = require("fix-esm").require('electron-is-dev');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		// show: false,
		// autoHideMenuBar: true,
  		// frame: false,
		// titleBarStyle: 'hidden',
		// titleBarOverlay: true,
		// titleBarOverlay: {
		// 	color: '#2f3241',
		// 	symbolColor: '#74b1be',
		// 	height: 60
		// },
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true, // Important for security and necessary for contextBridge
			enableRemoteModule: false, // Recommended for security
		},
	});

	const startURL = isDev.default
		? 'http://localhost:3000'
		: `file://${path.join(__dirname, './build/index.html')}`;

	mainWindow.loadURL(startURL);

	mainWindow.on('closed', () => (mainWindow = null));
}

ipcMain.on('close-app', () => {
	if (mainWindow) {
		mainWindow.close();
	}
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});