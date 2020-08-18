import { setBtn } from "./setBtn";
import { initInfos } from "./initInfos";
export const btnList = function(ele) {
    let btnList = {
        desktop: {},
        mobile: {
            Android: initInfos.Android,
            iOS: initInfos.iOS
        },
        history_version: initInfos.history_version
    };
    switch (ele.mobileSystem || ele.winVersion) {
        case "iPhone":
            btnList.desktop = {
                Android: initInfos.Android_full,
                MacOS: initInfos.MacOS,
                win64: initInfos.win10_8,
                win32: initInfos.win7
            };

            break;
        case "Android":
            btnList.desktop = {
                iOS: initInfos.iOS_full,
                MacOS: initInfos.MacOS,
                win64: initInfos.win10_8,
                win32: initInfos.win7
            };
            break;
        default:
            btnList.desktop.moreinfos = setBtn(ele).moreinfos;
            btnList.desktop.otherSystem = setBtn(ele).otherSystem;
            break;
    }

    return btnList;
};