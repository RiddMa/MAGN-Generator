<template>
  <v-container id="showBase" fluid style="position: relative">
    <v-row style="position: relative">
      <v-col class="showBase mx-auto" style="position: relative">
        <transition-group
          name="flip-list"
          v-on:enter="fadeInCaller"
          v-on:leave="fadeOutCaller"
        >
          <p
            key="0"
            v-if="this.posterURL === undefined"
            class="mb-2 text--secondary text-center"
            style="width: 100%"
          >
            图片加载中……
          </p>
          <v-container v-else key="1">
            <v-row
              v-if="fitPhone"
              class="justify-center align-baseline ma-auto pa-auto"
            >
              <span class="text-center text--secondary"
                >长按图片保存<br />（截图功能测试中，效果待优化）</span
              >
            </v-row>
            <template v-else>
              <p class="text-center">（截图功能测试中，效果待优化）</p>
              <v-row class="justify-center align-baseline ma-auto pa-auto">
                <span>右键选择“保存图片”</span>
                <span class="mx-8">或</span>
                <v-btn class="primary text-button" @click="downloadPic"
                  >点此下载为文件</v-btn
                >
              </v-row>
            </template>

            <v-row class="my-4">
              <img
                id="imgDisplay"
                :src="this.posterURL"
                style="object-fit: contain"
              />
            </v-row>
          </v-container>
        </transition-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { fadeIn, fadeOut } from "@/utils/animate";

export default {
  name: "PosterShow",
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      posterURL: (state) => state.netStore.posterURL,
    }),
  },
  methods: {
    downloadPic() {
      let a = document.createElement("a");
      a.href = this.posterURL;
      a.download = `MAGN_Poster_${this.$route.params.reviewId}`;
      a.click();
    },
    fadeInCaller(el, done) {
      fadeIn(el, done);
    },
    fadeOutCaller(el, done) {
      fadeOut(el, done);
    },
  },
  async mounted() {
    await this.$store.dispatch("downloadPoster", this.$route.params.reviewId);
    // document.querySelector("#imgDisplay").src = this.posterURL;
  },
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.75s;
  transition-timing-function: cubic-bezier(0.4, 1.1, 0, 1);
}
.showBase {
  max-width: 1024px;
}
#imgDisplay {
  width: 100%;
  height: 100%;
  -webkit-touch-callout: default;
}
</style>
