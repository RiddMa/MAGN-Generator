<template>
  <v-app>
    <v-app-bar app title color="primary" dark dense elevation="6">
      <v-tabs centered>
        <v-tab to="/">新建</v-tab>
        <v-tab to="/user">用户</v-tab>
        <v-tab to="/about">关于</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped></style>
