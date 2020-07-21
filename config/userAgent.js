export const readUserAgent = function() {
    let flag = true;
    let userAgentInfo = navigator.userAgent;
    let mobileSystem = ""; {
        //判断设备类型 移动端/桌面端
        let Agents = [
            "Android",
            "iPhone",
            "SymbianOS",
            "Windows Phone",
            "iPad",
            "iPod"
        ];
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                mobileSystem = Agents[v];
                flag = false;
                break;
            }
        }
    }
    let isMac = Boolean;
    let isWindows = Boolean;
    let winVersion = "";
    let downloadHrefWin = ""
    let pcNum = Number; {
        //判断系统win/mac
        isMac = (function() {
            return /macintosh|mac os x/i.test(navigator.userAgent);
        })();
        isWindows = (function() {
            return /windows|win32/i.test(navigator.userAgent);
        })();
        if (isWindows) {
            //如果是windows电脑
            //检测一下版本
            if (userAgentInfo.indexOf("Windows NT 5") != -1) {
                winVersion = "XP系统";
            } else if (userAgentInfo.indexOf("Windows NT 7") != -1) {
                winVersion = "win 7";
            } else if (userAgentInfo.indexOf("Windows NT 8") != -1) {
                winVersion = "win 8";
            } else if (userAgentInfo.indexOf("Windows NT 10") != -1) {
                winVersion = "win 10";
            }
            //判断windows系统位数 32/64
            let agent = userAgentInfo.toLowerCase();
            if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
                downloadHrefWin = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_ia32%20.exe"
                pcNum = 32
            }
            if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
                downloadHrefWin = "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_x64%20.exe"
                pcNum = 64
            }
        }
    }
    // 分割线分割线分割线分割线分割线分割线分割线分割线分割线分割线分割线分割线分割线
    return {
        flag: flag, //false,说明是手机端
        mobileSystem: mobileSystem, //手机系统 可以判断手机类型
        isMac: isMac,
        isWindows: isWindows,
        winVersion: winVersion,
        downloadHrefWin: downloadHrefWin,
        pcNum: pcNum
    };
    return {
        flag: true, //false,说明是手机端
        mobileSystem: '', //手机系统 可以判断手机类型
        isMac: true,
        isWindows: false,
        winVersion: '',
        downloadHrefWin: downloadHrefWin,
        pcNum: 64
    };
};