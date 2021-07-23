<template>
  <v-container>
    <v-row>
      <!--      <v-spacer></v-spacer>-->
      <v-col class="reviewBase mx-auto">
        <Review></Review>
      </v-col>
      <!--      <v-spacer></v-spacer>-->
    </v-row>
  </v-container>
</template>

<script>
import Review from "@/components/Review";
export default {
  name: "New",
  components: { Review },
};
</script>

<style scoped>
.reviewBase {
  max-width: 1024px;
}
</style>
