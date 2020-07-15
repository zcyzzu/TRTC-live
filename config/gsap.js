import gsap from "gsap";
export const downloadCard = function(ele) {
    gsap.fromTo(
        ele, {
            x: -400,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.7
        }
    );
};
export const rightBottom = function(ele) {
    gsap.fromTo(
        ele, {
            y: 400,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.7
        }
    );
};
export const moreVersion = function(ele, bool) {
    if (bool) {
        gsap.to(ele, {
            rotationX: 360,
            duration: 0.1
        });
    } else {
        gsap.to(ele, {
            rotationX: 180,
            duration: 0.1
        });
    }
};

export const historyVersions = function(latest, history) {
    gsap.to(latest, {
        x: 1000,
        display: "none",
        opacity: 0,
        onComplete: () => {
            gsap.to(history, {
                display: "block",
                ease: "elastic",
                duration: 1.3,
                opacity: 1,
                x: 1000
            });
        }
    });
}
export const backToLatest = function(latest, history) {
    gsap.to(history, {
        x: 0,
        display: "none",
        opacity: 0,
        onComplete: () => {
            gsap.to(latest, {
                display: "block",
                ease: "elastic",
                duration: 1.3,
                opacity: 1,
                x: 0
            });
        }
    });
}