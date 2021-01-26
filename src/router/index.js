import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Index",
        component: () =>
            import ("../views/index.vue"),
    },
    {
        path: "/room",
        name: "Room",
        component: () =>
            import ("../views/room.vue"),
    },
    // {
    //     path: "/setting",
    //     component: () =>
    //         import ("../views/setting.vue"),
    //     meta: {
    //         active: "/setting",
    //     },
    //     children: [{
    //             path: "",
    //             component: () =>
    //                 import ("../views/setting/general.vue"),
    //             meta: {
    //                 active: 0,
    //             },
    //         },
    //         {
    //             path: "sound",
    //             component: () =>
    //                 import ("../views/setting/sound.vue"),
    //             meta: {
    //                 active: 1,
    //             },
    //         },
    //         {
    //             path: "others",
    //             component: () =>
    //                 import ("../views/setting/others.vue"),
    //             meta: {
    //                 active: 2,
    //             },
    //         },
    //     ],
    // },
];

const router = new VueRouter({
    routes,
});

export default router;