const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require("fix-esm").require('electron-is-dev');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	console.log(isDev.default)
	const startURL = isDev.default
		? 'http://localhost:3000'
		: `file://${path.join(__dirname, './build/index.html')}`;
	console.log(startURL)
	mainWindow.loadURL(startURL);

	mainWindow.on('closed', () => (mainWindow = null));
}

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