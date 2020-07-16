export const computeHeight = function(info) {
    if (
        (info.isWindows && info.winVersion == "win 10") ||
        info.winVersion == "win 8"
    ) {
        return 258;
    } else if (info.isMac) {
        return 258;
    } else if (info.isWindows && info.winVersion == "win 7") {
        return 258;
    } else if (!info.flag && info.mobileSystem == "iPhone") {
        return 320;
    } else if (!info.flag && info.mobileSystem == "Android") {
        return 320;
    }
};