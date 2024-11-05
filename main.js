const { app, BrowserWindow } = require('electron/main')
if (process.platform === 'darwin' && process.arch === 'x64') {
	app.disableHardwareAcceleration()
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    frame: false,  // 无边框
    autoHideMenuBar: true,  // 隐藏菜单栏
    fullscreen: false, // 全屏显示
    webPreferences: {
      nodeIntegration: true, // 启用 Node.js 支持
      contextIsolation: false,
      enableRemoteModule: true, // 启用远程模块（如果需要
    }
  })

  win.webContents.openDevTools()

  win.loadFile('index.html')
}

app.whenReady().then(() => {
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