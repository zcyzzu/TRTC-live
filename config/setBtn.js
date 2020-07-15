export const setBtn = function(ele) {
    let infos = {
        downloadInfo: "",
        block: true,
        icon: "",
        href: ""
    };
    let moreinfos = {
        downloadInfo: "",
        block: true,
        icon: "",
        href: ""
    }
    let otherSystem = {
        downloadInfo: "",
        block: true,
        icon: "",
        href: ""
    }
    if (ele.flag) {
        //电脑端
        if (ele.isMac) {
            //mac电脑
            infos.downloadInfo = "MacOS";
            infos.icon = "mdi-apple";
            infos.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_mac.dmg";
            //windows
            moreinfos.downloadInfo = 'Windows' + " " + 64;
            moreinfos.icon = "mdi-microsoft-windows";
            moreinfos.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_x64%20.exe";
            otherSystem.downloadInfo = 'Windows' + " " + 32
            otherSystem.icon = "mdi-microsoft-windows";
            otherSystem.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_ia32%20.exe";

        } else {
            //windows电脑
            if (ele.winVersion == "win 7") {
                //win 7 系统
                infos.downloadInfo = ele.winVersion + " " + ele.pcNum;
                infos.icon = "mdi-microsoft-windows";
                infos.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_x64%20.exe";
                ele.pcNum == 64 ? moreinfos.downloadInfo = ele.winVersion + " " + 32 : moreinfos.downloadInfo = ele.winVersion + " " + 64
                moreinfos.icon = "mdi-microsoft-windows";
                moreinfos.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_ia32%20.exe";
                otherSystem.downloadInfo = "MacOS";
                otherSystem.icon = "mdi-apple";
                otherSystem.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_mac.dmg";
            } else {
                //其他系统
                infos.downloadInfo = ele.winVersion + " " + ele.pcNum;
                infos.icon = "mdi-microsoft-windows";
                infos.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_x64%20.exe";
                ele.pcNum == 64 ? moreinfos.downloadInfo = ele.winVersion + " " + 32 : moreinfos.downloadInfo = ele.winVersion + " " + 64
                moreinfos.icon = "mdi-microsoft-windows";
                moreinfos.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_ia32%20.exe";
                otherSystem.downloadInfo = "MacOS";
                otherSystem.icon = "mdi-apple";
                otherSystem.href = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_mac.dmg";
            }
        }
    } else {
        //手机端
        if (ele.mobileSystem == "iPhone") {
            //ios系统
            infos.downloadInfo = "ios版";
            infos.icon = "mdi-apple";
            infos.href = "";
        } else {
            //安卓系统
            infos.downloadInfo = "Android";
            infos.icon = "mdi-android";
            infos.href = "";
        }
    }
    return {
        infos: infos,
        moreinfos: moreinfos,
        otherSystem: otherSystem
    };
};