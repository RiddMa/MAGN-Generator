<template>
  <v-snackbar
    id="snackbar"
    class="dialog mt-4"
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
    <v-container class="ma-0 pa-0" fluid style="position: relative">
      <v-row class="justify-center mt-2 mb-0 mx-0 pa-0" style="width: 100%">
        <span class="body--text text-body-1 ma-0 pa-0">
          <v-icon dense light :color="toast.color">
            {{ toast.icon }}
          </v-icon>
          {{ toast.message }}
        </span>
      </v-row>
      <v-row
        class="justify-space-between mx-0 mt-4 mb-0 pa-0"
        style="width: 100%"
        v-if="toast.dialog"
      >
        <v-spacer></v-spacer>
        <v-btn
          class="text-button ma-0 pa-0"
          light
          color="primary"
          outlined
          elevation="0"
          @click="onDialogButtonClicked(false)"
          :loading="loading"
        >
          <span> 取消 </span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="dialog text-button"
          light
          color="red"
          outlined
          elevation="0"
          @click="onDialogButtonClicked(true)"
          :loading="loading"
        >
          <span> 好! </span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
import { setCSSBlur, unsetCSSBlur } from "@/utils/util";

export default {
  name: "vToast",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      toast: (state) => state.toast,
    }),
  },
  methods: {
    async onDialogButtonClicked(bool) {
      if (bool) {
        //true
        this.loading = true;
        this.$store.commit("setToastResult", true);
        this.toast.show = false;
        switch (this.toast.func) {
          case "clearMovie": {
            this.$store.commit("clearMovie");
            await this.$store.dispatch("updateRadar");
            this.loading = false;
            break;
          }
          case "deleteMovie": {
            await this.$store.dispatch(
              "deleteUserReview",
              this.$store.state.movie.reviewId
            );
            this.$store.commit("setIsEditing", false);
            this.loading = false;
            await this.$router.replace("/user");
            break;
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
    // document.querySelector(".v-snack__content").style.width = "100%";
    if (this.toast.show && this.toast.dialog) {
      setCSSBlur(".v-overlay__scrim");
      setCSSBlur("#dialogOverlay");
    }
  },
};
</script>

<style>
#snackbar .v-snack__wrapper {
  background-color: rgba(255, 255, 255, 0.75) !important;
  backdrop-filter: blur(5px) !important;
  -webkit-backdrop-filter: blur(5px) !important;
}

#snackbar .v-snack__content {
  width: 100%;
}
.dialog {
  border-width: 2px;
}
</style>
