<template>
  <div id="nav">
    <!--    <a-back-top visibilityHeight="20" />-->
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
html,
body {
  font-family: "Noto Sans SC", sans-serif;
}

#app {
  /*font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;*/
  font-family: "Noto Sans SC", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #00c198;
}

.ant-back-top {
  bottom: 100px;
}
</style>
