const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { argv } = require('yargs')

const PROD = true;

// Check for app updates
//require('update-electron-app')()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWin

const createWindow = () => {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 200,
    minWidth: 300,
    frame: false,
    icon: __dirname + '/icon/x500.png',
    backgroundColor: '#3B4750',
    webPreferences: {
      preload: path.join(__dirname, 'api/bridge.js'),
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      allowRendererProcessReuse: true
    }
  });

  // and load the index.html of the app.
  if(PROD){
    mainWin.loadFile('./src/react/index.html');
  } else {
    mainWin.loadURL('http://localhost:3000/');
    mainWin.webContents.openDevTools();
  }

  // Open the DevTools.
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("fullscreen", async (e, d) => {
    mainWin.setFullScreen(d) 
    return 0
});

ipcMain.handle("getFile", async (e) => {
  return argv._
});

ipcMain.handle("winAction", async (e, d) => {
  switch(d){
    case 'close':
      app.quit();
      break;
    case 'minimise': 
    mainWin.minimize()
    break;
    case 'toggleMaximise':
      mainWin.isMaximized() ? mainWin.unmaximize() : mainWin.maximize()
  }

});