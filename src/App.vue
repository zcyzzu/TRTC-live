<template>
  <div id="app">
    <v-app style="position:relative">
      <router-view />
    </v-app>
  </div>
</template>

<style lang="scss">
html,
body {
  overflow-y: hidden !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
