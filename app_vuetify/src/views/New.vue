<template>
  <v-container id="newBase" fluid>
    <v-row>
      <v-col class="reviewBase ma-auto">
        <Settings></Settings>
        <Review chart-id="newRadar"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import { newIn, newOut } from "@/utils/animate";
export default {
  name: "New",
  components: { Settings, Review },
  mounted() {
    // newIn("left");
  },
  beforeDestroy() {
    // newOut("left");
  },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
