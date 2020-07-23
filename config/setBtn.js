import { initInfos } from "./initInfos";
export const setBtn = function (ele) {
    let infos = initInfos.empty
    let moreinfos = initInfos.empty
    let otherSystem = initInfos.empty
    if (ele.flag) {
        //电脑端
        if (ele.isMac) {
            //mac电脑
            infos = initInfos.MacOS
            moreinfos = initInfos.win10_64
            otherSystem = initInfos.win10_32
        } else {
            //windows电脑
            if (ele.winVersion == 'win 7') {
                if (ele.pcNum == 64) {
                    infos = initInfos.win7_64
                    moreinfos = initInfos.win7_32
                } else {
                    infos = initInfos.win7_32
                    moreinfos = initInfos.win7_64
                }
            } else if (ele.winVersion == 'win 8') {
                if (ele.pcNum == 64) {
                    infos = initInfos.win8_64
                    moreinfos = initInfos.win8_32
                } else {
                    infos = initInfos.win8_32
                    moreinfos = initInfos.win8_64
                }
            } else if (ele.winVersion == 'win 10') {
                if (ele.pcNum == 64) {
                    infos = initInfos.win10_64
                    moreinfos = initInfos.win10_32
                } else {
                    infos = initInfos.win10_32
                    moreinfos = initInfos.win10_64
                }
            }
            otherSystem = initInfos.MacOS
        }
    } else {
        //手机端
        ele.mobileSystem == "iPhone" ? infos = initInfos.iOS_full : infos = initInfos.Android_full
    }
    return {
        infos: infos,
        moreinfos: moreinfos,
        otherSystem: otherSystem
    };
};