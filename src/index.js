const {
  app,
  BrowserWindow,
  dialog
} = require('electron');
const path = require('path');
const fs = require('fs');
const {
  autoUpdater
} = require("electron-updater")

const isDev = require("electron-is-dev")

app.disableHardwareAcceleration();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    vibrancy: 'ultra-dark',
  });

  mainWindow.setAlwaysOnTop(true, 'screen');

  mainWindow.loadURL("https://lostarkmap.com/");
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.on('did-finish-load', () => {
    console.log("CSS Imported")
    mainWindow.webContents.insertCSS(fs.readFileSync(path.join(__dirname, 'style.css')).toString())

    mainWindow.webContents.executeJavaScript(fs.readFileSync(path.join(__dirname, 'transformImage.js')).toString())
      .then(console.log('JavaScript Executed Successfully'));

  });
  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on("update-available", (_event, releseNotes, releseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Okay"],
    title: "Update!",
    message: process.platform == "win32" ? releseNotes : releseName,
    detail: "A new version is being downloades"
  }
  dialog.showMessageBox(dialogOpts, (response) = {

  })
});