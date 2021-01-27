"use strict";
import { app, protocol, BrowserWindow, ipcMain, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

const Axios = require("axios");
const isDevelopment = process.env.NODE_ENV !== "production";
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);

let win, setting, room;
async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        width: 1610,
        height: 860,
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
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        win.loadURL("app://./index.html");
    }
}
async function createSettingWindow() {
    setting = new BrowserWindow({
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
    setting.setMenu(null);
    setting.webContents.openDevTools();
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await setting.loadURL("http://localhost:8080/#/setting");
    } else {
        createProtocol("app");
        setting.loadURL("app://./index.html#setting");
    }
}
app.on("ready", async() => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    createWindow();
    ipcMain.on("newTrtcCloud", function(event, arg) {
        console.log(arg, "arg");
        let trtcCloud = "trtcCloud";
        event.reply("newTrtcCloud_reply", trtcCloud);
    });
    //分割线分割线分割线分割线分割线分割线
    ipcMain.on("setting", function(event, arg) {
        createSettingWindow();
    });
    ipcMain.on("createRoom", async function(event, arg) {
        win.setFullScreen(true);
    });
    ipcMain.on("exitRoom", async function(event, arg) {
        win.setFullScreen(false);
    });
    ipcMain.on("miniIndex", async function(event, arg) {
        win.minimize();
    });
    ipcMain.on("closeIndex", function(event, arg) {
        if (arg === "/") {
            win.destroy();
        } else if (arg === "others" || arg === "general" || arg === "sound") {
            setting.destroy();
        }
    });
    ipcMain.on("login", function(event, arg) {
        Axios.get(arg)
            .then((val) => {
                event.reply("login_back", val.data);
            })
            .catch((err) => {
                event.reply("login_back_error", err);
            });
    });
});

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
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});