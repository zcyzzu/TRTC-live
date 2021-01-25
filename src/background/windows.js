import { app, protocol, BrowserWindow, ipcMain, Menu } from "electron";
export async function createSettingWindows(win) {
    let settingWindows = new BrowserWindow({
        parent: win,
        modal: true,
        width: 700,
        frame: false,
        // resizable: false, //禁止自定义窗口尺寸
        height: 600,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        },
    });
    settingWindows.setMenu(null);
    settingWindows.webContents.openDevTools();
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await settingWindows.loadURL("http://localhost:8080/#/setting");
    } else {
        createProtocol("app");
        settingWindows.loadURL("app://./index.html#setting");
    }
    return settingWindows;
}