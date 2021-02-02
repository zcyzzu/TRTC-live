"use strict";
const electron = require("electron");
import { app, protocol, BrowserWindow, ipcMain, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import axios from "axios"
const isDevelopment = process.env.NODE_ENV !== "production";
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);

let win, qrcode;
async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        width: 1200,
        height: 800,
        frame: false,
        // backgroundColor: "#000",
        resizable: false, //禁止自定义窗口尺寸
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
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    createWindow();
    ipcMain.on("createRoom", async function (event, arg) {
        win.setFullScreen(true);
    });
    ipcMain.on("exitRoom", async function (event, arg) {
        win.setFullScreen(false);
    });
    ipcMain.on("miniIndex", async function (event, arg) {
        win.minimize();
    });
    ipcMain.on("closeIndex", function (event, arg) {
        win.destroy();
    });
    ipcMain.on("login", function (event, arg) {
        //TODO 如果开启代理，因为代理使用http协议，但是axios请求远程服务器地址为tls加密
        //会导致axios报错
        axios.get(arg)
            .then((val) => {
                event.reply("login_back", val.data);
            })
            .catch((err) => {
                //TODO post err log to server
                console.log(err)
                event.reply("login_back_error", err);
            });
    });
    let displays = electron.screen.getAllDisplays(); //获取所有显示器数组
    ipcMain.on("sendXY", function (
        event,
        width_x,
        height_y,
        windows_x,
        windows_y,
        display_num
    ) {
        qrcode = new BrowserWindow({
            width: Number(width_x) + 1,
            height: Number(height_y) + 1,
            frame: false, //无框
            transparent: true, //透明
            x: Number(windows_x) + displays[display_num].bounds.x,
            y: Number(windows_y),
        });
        qrcode.loadURL(
            `file://E:/work/daoshicloud-live-electron/qrcode_border.html`
        );
        // qrcode.loadURL(`file://${__dirname}/qrcode_border.html`);
        setTimeout(() => {
            event.reply("sendXY_back", false);
            qrcode.destroy();
        }, 1500);
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