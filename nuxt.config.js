import colors from 'vuetify/es5/util/colors'

export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    server: {
        port: 8000, // default: 3000
        host: '0.0.0.0' // default: localhost,
    },
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'static',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: "直播啦",
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        },
        // {
        //     rel: 'stylesheet',
        //     href: 'https://fonts.loli.net/icon?family=Material+Icons'
        // },
        {
            rel: 'stylesheet',
            href: 'https://cdn.bootcdn.net/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css'
        }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        "~/assets/main.css"
    ],
    router: {
        // middleware: ['index'],
        fallback: true,
    },
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        defaultAssets: {
            font: false,
            icons: false
        },
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        },
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        babel: {
            sourceType: "unambiguous",
        },
        transpile: [
            "vuetify",
        ],
        // transpile: [
        //     /(.+)(nuxt-vuex-localstorage\/)(.+)(\.js)$/
        // ],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) { },
    },
}