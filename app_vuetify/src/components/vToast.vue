<template>
  <v-snackbar
    :app="true"
    :color="toast.color"
    :timeout="toast.timer"
    v-model="toast.show"
    content-class="toast"
    light
    elevation="12"
    outlined
    rounded
    top
  >
    <v-row class="align-center">
      <v-spacer></v-spacer>
      <v-icon light left>{{ toast.icon }}</v-icon>
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

<style scoped>
.toast {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>
