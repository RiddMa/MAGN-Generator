<template>
  <v-container id="newBase" fluid>
    <v-row>
      <v-col class="reviewBase mx-auto">
        <span v-if="fitPhone">长按保存</span>
        <span v-else>右键保存</span>
        <v-img id="imgDisplay" contain src="" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PosterShow",
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      posterURL: (state) => state.posterURL,
    }),
  },
  async mounted() {
    await this.$store.dispatch("downloadPoster", this.$route.params.reviewId);
    document.querySelector("#imgDisplay").src = this.posterURL;
  },
};
</script>

<style scoped></style>
