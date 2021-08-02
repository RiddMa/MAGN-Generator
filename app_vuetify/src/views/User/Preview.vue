<template>
  <v-container v-if="fitPhone" id="reviewBase" fluid class="ma-0 pa-0">
    <v-row v-if="fitPhone" class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <v-row
          class="justify-space-between mb-4 mt-2 mx-auto pa-auto text-center"
        >
          <v-btn
            class="grow outlineBtn text-button"
            outlined
            elevation="2"
            style="max-width: 45%"
            @click="onLeaveClicked"
            :loading="loading"
          >
            <v-icon dense> mdi-chevron-left </v-icon>
            返回
          </v-btn>
          <v-btn
            class="grow text-button success"
            elevation="2"
            @click="onRenderClicked"
            style="max-width: 45%"
            :loading="loading"
          >
            <v-icon dense class="mr-1">mdi-image</v-icon>
            渲染截图
          </v-btn>
        </v-row>
        <ReviewPhone mode="view"></ReviewPhone>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else id="reviewBase" fluid>
    <v-row>
      <v-col class="reviewBase mx-auto">
        <v-row class="justify-space-between mx-4 mt-2 mb-8 pa-auto text-center">
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-btn
                class="grow outlineBtn secondary--text text-button"
                outlined
                :elevation="hover ? 6 : 2"
                @click="onLeaveClicked"
                style="max-width: 45%"
                :loading="loading"
              >
                <v-icon dense> mdi-chevron-left </v-icon>
                返回
              </v-btn>
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-btn
                class="grow text-button success"
                :elevation="hover ? 6 : 2"
                @click="onRenderClicked"
                style="max-width: 45%"
                :loading="loading"
              >
                <v-icon dense class="mr-1">mdi-image</v-icon>
                渲染截图
              </v-btn>
            </template>
          </v-hover>
        </v-row>
        <Review mode="view"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import store from "@/store/store";
import { mapState } from "vuex";
import ReviewPhone from "@/components/ReviewPhone";
export default {
  name: "Preview",
  components: { ReviewPhone, Review },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
    }),
  },
  methods: {
    async onLeaveClicked() {
      this.$store.commit("setIsViewing", false);
      await this.$router.replace("/user");
    },
    async onRenderClicked() {
      this.loading = true;
      await this.$store.dispatch("generatePoster");
      this.loading = false;
      this.$store.commit("showToast", { type: "success", message: "生成成功" });
      await this.$router.push(`/poster/${this.$store.state.movie.reviewId}`);
    },
  },
  async beforeRouteEnter(to, from, next) {
    const tag = "/view";
    if (store.state.currentTag !== tag) {
      store.commit("setCurrentTag", tag);
      await store.dispatch("restoreMovie", tag);
    }
    if (store.state.userStore.reviewList.length === 0) {
      store.state.reloadWarning = true;
      next("/user");
    }
    next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch("backupMovie", "/view");
    next();
  },
};
</script>

<style src="../../styles/customButton.css" scoped></style>
<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
