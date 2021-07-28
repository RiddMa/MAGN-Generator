<template>
  <v-snackbar
    id="snackbar"
    class="mt-8"
    content-class="toast"
    :app="true"
    :color="toast.color"
    :timeout="toast.timer"
    v-model="toast.show"
    light
    elevation="12"
    outlined
    rounded
    top
  >
    <v-row class="align-center">
      <v-spacer></v-spacer>
      <v-icon light left :color="toast.color">{{ toast.icon }}</v-icon>
      <span class="text--primary text-body">{{ toast.message }}</span>
      <v-spacer></v-spacer>
    </v-row>

    <!--    <template v-slot:action="{ attrs }">-->
    <!--      <v-btn-->
    <!--        light-->
    <!--        :color="toast.color + 'lighten-4'"-->
    <!--        outlined-->
    <!--        elevation="0"-->
    <!--        v-bind="attrs"-->
    <!--        @click="toast.show = false"-->
    <!--      >-->
    <!--        <span id="closeText"> 关闭 </span>-->
    <!--      </v-btn>-->
    <!--    </template>-->
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "vToast",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      toast: (state) => state.toast,
    }),
  },
  mounted() {},
};
</script>

<style>
#snackbar .v-snack__wrapper {
  background-color: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(5px) !important;
  -webkit-backdrop-filter: blur(5px) !important;
}
</style>
