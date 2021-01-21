"use strict";
import { app, protocol, BrowserWindow, ipcMain, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);

let win, wins;
async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        width: 1410,
        height: 960,
        frame: false,
        backgroundColor: "#eee",
        // resizable: false, //禁止自定义窗口尺寸
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        },
    });
    win.once("ready-to-show", () => {
        win.show();
    });
    win.setMenu(null);
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }
}

async function createSettingWindow() {
    wins = new BrowserWindow({
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
    wins.setMenu(null);
    wins.webContents.openDevTools();
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await wins.loadURL("http://localhost:8080/#/setting");
    } else {
        createProtocol("app");
        wins.loadURL("app://./index.html#setting/general");
    }
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async() => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    createWindow();
    ipcMain.on("setting", function(event, arg) {
        createSettingWindow();
    });
    ipcMain.on("closeIndex", function(event, arg) {
        if (arg === "/") {
            win.destroy();
        } else if (arg === "others" || arg === "general" || arg === "sound") {
            wins.destroy();
        }
    });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}