import { setBtn } from "./setBtn";
export const btnList = function(ele, system) {
    let btnList = {
        desktop: {},
        mobile: {
            Android: {
                downloadInfo: "Android",
                block: false,
                icon: "mdi-android",
                href: ""
            },
            IOS: {
                downloadInfo: "IOS",
                block: false,
                icon: "mdi-apple",
                href: ""
            }
        },
        history_version: {
            downloadInfo: "历史版本下载",
            block: true,
            icon: "",
            href: "",
            rightArray: "mdi-chevron-right"
        }
    };
    switch (system) {
        case "iPhone":
            btnList.desktop = {
                Android: {
                    downloadInfo: "Android",
                    block: true,
                    icon: "mdi-android",
                    href: ""
                },
                MacOS: {
                    downloadInfo: "MacOS",
                    block: true,
                    icon: "mdi-apple",
                    href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_mac.dmg"
                },
                win64: {
                    downloadInfo: "Windows 64位",
                    block: true,
                    icon: "mdi-microsoft-windows",
                    href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_x64%20.exe"
                },
                win32: {
                    downloadInfo: "Windows 32位",
                    block: true,
                    icon: "mdi-microsoft-windows",
                    href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_ia32%20.exe"
                }
            };

            break;
        case "Android":
            btnList.desktop = {
                IOS: {
                    downloadInfo: "IOS",
                    block: true,
                    icon: "mdi-apple",
                    href: ""
                },
                MacOS: {
                    downloadInfo: "MacOS",
                    block: true,
                    icon: "mdi-apple",
                    href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_mac.dmg"
                },
                win64: {
                    downloadInfo: "Windows 64位",
                    block: true,
                    icon: "mdi-microsoft-windows",
                    href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_x64%20.exe"
                },
                win32: {
                    downloadInfo: "Windows 32位",
                    block: true,
                    icon: "mdi-microsoft-windows",
                    href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_ia32%20.exe"
                }
            };
            break;
        default:
            btnList.desktop.moreinfos = setBtn(ele).moreinfos;
            btnList.desktop.otherSystem = setBtn(ele).otherSystem;
            break;
    }

    return btnList;
};