export const isSupport = () => {
    const ua = window.navigator.userAgent;
    //判断IE和Edge浏览器
    if (
        ua.includes("Edge") ||
        (window.navigator.appName == "Microsoft Internet Explorer" ||
            (window.navigator.appName == "Netscape" &&
                new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(
                    window.navigator.userAgent
                ) != null))
    ) {
        return {
            statusCode: "400",
            message: "我们不支持IE和Edge浏览器",
            desc: "请至https://www.google.com/intl/zh-CN/chrome/下载最新浏览器"
        }
    }
}