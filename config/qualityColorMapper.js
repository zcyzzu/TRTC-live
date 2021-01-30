export const networkQualityEnumMapper = function(quality) {
    switch (quality) {
        case 0:
            return {
                text: "未定义",
                color: "white",
            };
            //excellent
        case 1:
            return {
                text: "很好",
                color: "green",
            };
            //good
        case 2:
            return {
                text: "好",
                color: "yellowgreen",
            };
            //poor
        case 3:
            return {
                text: "一般",
                color: "yellow",
            };
            //bad
        case 4:
            return {
                text: "差",
                color: "saddlebrown",
            };
            //very bad
        case 5:
            return {
                text: "很差",
                color: "orangered",
            };
        case 6:
            return {
                text: "断开",
                color: "black",
            };
    }
};