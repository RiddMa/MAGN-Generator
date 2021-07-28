<template>
  <v-container>
    <v-row>
      <v-col class="reviewBase ma-auto">
        <Settings mode="edit"></Settings>
        <Review mode="edit"></Review>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
import Settings from "@/components/Settings";
export default {
  name: "Edit",
  components: { Settings, Review },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
