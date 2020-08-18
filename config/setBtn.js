import { initInfos } from "./initInfos";
export const setBtn = function(ele) {
    //初始化
    let infos = initInfos.empty;
    let moreinfos = initInfos.empty;
    let otherSystem = initInfos.empty;
    if (ele.flag) {
        //电脑端
        if (ele.isMac) {
            //mac电脑
            infos = initInfos.MacOS;
            moreinfos = initInfos.win10_8;
            otherSystem = initInfos.win7;
        } else {
            //windows电脑
            if (ele.winVersion == "win 7") {
                infos = initInfos.win7;
                moreinfos = initInfos.win10_8;
            } else if (ele.winVersion == "win 8" || ele.winVersion == "win 10") {
                infos = initInfos.win10_8;
                moreinfos = initInfos.win7;
            }
            otherSystem = initInfos.MacOS;
        }
    } else {
        //手机端
        ele.mobileSystem == "iPhone" ?
            (infos = initInfos.iOS_full) :
            (infos = initInfos.Android_full);
    }
    return {
        infos: infos,
        moreinfos: moreinfos,
        otherSystem: otherSystem
    };
};