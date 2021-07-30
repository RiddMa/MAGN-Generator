<template>
  <v-snackbar
    id="snackbar"
    class="mt-4"
    content-class="toast"
    :app="true"
    light
    elevation="12"
    outlined
    rounded
    top
    :color="toast.color"
    :timeout="toast.timer"
    v-model="toast.show"
    :vertical="toast.dialog"
  >
    <v-row class="justify-center mx-2 my-1">
      <v-spacer></v-spacer>
      <span class="text--primary text-body-1 ma-0 pa-0">
        <v-icon dense light left :color="toast.color">
          {{ toast.icon }}
        </v-icon>
        {{ toast.message }}
      </span>
      <v-spacer></v-spacer>
    </v-row>
    <v-row
      class="justify-center align-center mx-2 mt-4 mb-1 pa-0"
      v-if="toast.dialog"
    >
      <v-btn
        class="ma-0 pa-0"
        light
        color="primary"
        outlined
        elevation="4"
        @click="onDialogButtonClicked(false)"
      >
        <span> 取消 </span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        light
        color="red"
        outlined
        elevation="4"
        @click="onDialogButtonClicked(true)"
      >
        <span> 好 </span>
      </v-btn>
    </v-row>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
import { setCSSBlur, unsetCSSBlur } from "@/utils/util";

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
  methods: {
    onDialogButtonClicked(bool) {
      if (bool) {
        //true
        this.$store.commit("setToastResult", true);
        this.toast.show = false;
        switch (this.toast.func) {
          case "clearMovie": {
            this.$store.commit("clearMovie");
            this.$store.dispatch("updateRadar");
          }
        }
      } else {
        this.toast.show = false;
      }
      unsetCSSBlur(".v-overlay__scrim");
      unsetCSSBlur("#dialogOverlay");
    },
  },
  updated() {
    if (this.toast.show && this.toast.dialog) {
      setCSSBlur(".v-overlay__scrim");
      setCSSBlur("#dialogOverlay");
    }
  },
};
</script>

<style>
#snackbar .v-snack__wrapper {
  background-color: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(5px) !important;
  -webkit-backdrop-filter: blur(5px) !important;
}
</style>
