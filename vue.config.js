const StringReplaceWebpackPlugin = require("string-replace-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const CompressionPlugin = require("compression-webpack-plugin");
const os = require("os");
console.log("process.argv:", process.argv);

function getArgvToObject() {
    let cmdArgvs = process.argv;
    let param = {};
    let key = "";
    let tmp = [];
    for (let i = 0; i < cmdArgvs.length; i++) {
        if (/^--[\w\d_-]+/g.test(cmdArgvs[i])) {
            tmp = cmdArgvs[i].replace("--", "").split("=");
            key = tmp[0].toUpperCase();
            param[key] = tmp[1];
        }
    }
    return param;
}

let param = getArgvToObject();

if (!param.TRTC_ENV) {
    param.TRTC_ENV = "development";
}

if (!param.TRTC_ENV ||
    !["production", "development"].includes(param.TRTC_ENV)
) {
    param.TRTC_ENV = "development";
}

if (!param.TARGET_PLATFORM ||
    !["darwin", "win32"].includes(param.TARGET_PLATFORM)
) {
    param.TARGET_PLATFORM = os.platform();
}
module.exports = {
    configureWebpack: {
        devtool: "source-map",
        module: {
            rules: [{
                test: /\.node$/,
                loader: "native-ext-loader",
                options: {
                    emit: true,
                    rewritePath: process.env.NODE_ENV === "production" ?
                        "./" :
                        "node_modules/trtc-electron-sdk/build/Release/",
                },
            }, ],
        },
        // plugins: [
        //     new WebpackObfuscator({
        //         rotateStringArray: true,
        //         compact: true, // 紧凑 从输出混淆代码中删除换行符。
        //         controlFlowFlattening: false, // 此选项极大地影响了运行速度降低1.5倍的性能。 启用代码控制流展平。控制流扁平化是源代码的结构转换，阻碍了程序理解。
        //     }),
        //     new CompressionPlugin({
        //         algorithm: "gzip",
        //         test: /\.js$|\.html$|\.css/, // + $|\.svg$|\.png$|\.jpg
        //         threshold: 10240, //对超过10k的数据压缩
        //         deleteOriginalAssets: false, //不删除原文件
        //     }),
        //     new StringReplaceWebpackPlugin(),
        // ],
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            nodeModulesPath: ["./node_modules"],
            builderOptions: {
                productName: "直播啦", //项目名，也是生成的安装文件名
                electronVersion: "9.0.0",
                appId: "zhibola-appid",
                copyright: "Copyright © 2020", //版权信息
                directories: {
                    output: "./dist", //输出文件路径
                },
                win: {
                    //win相关配置
                    icon: "./src/static/icon.png", //图标，当前图标在根目录下，注意这里有两个坑
                    target: [{
                        target: "nsis", //利用nsis制作安装程序
                        arch: [
                            "x64", //64位
                            "ia32", //32位
                        ],
                    }, ],
                    extraFiles: {
                        from: "node_modules/trtc-electron-sdk/build/Release/",
                        to: "./resources",
                        filter: ["**/*"]
                    },
                },
                extraResources: {
                    from: "./src/resources",
                    to: "./resources",
                },
                nsis: {
                    oneClick: true,
                    allowElevation: true,
                    allowToChangeInstallationDirectory: false,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    artifactName: "zhibola_${version}_${os}.${ext}",
                    uninstallDisplayName: "直播啦",
                },
                mac: {
                    hardenedRuntime: false,
                    gatekeeperAssess: false,
                    artifactName: "zhibola_${version}_${os}.${ext}",
                    icon: "./src/static/icon.png",
                    extraFiles: [{
                        from: "node_modules/trtc-electron-sdk/build/Release",
                        to: "./Frameworks",
                    }, ],
                },
                dmg: {
                    title: "zhibola_${version}",
                    sign: false,
                },
            },
        },
    },
};