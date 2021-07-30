<template>
  <v-container v-if="fitPhone" id="aboutBase" fluid class="mx-0 mt-0 mb-8 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col class="aboutBase ma-0 pa-0">
        <AboutCard :fit-phone="true"></AboutCard>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else id="aboutBase" fluid>
    <v-row>
      <v-col class="aboutBase ma-auto">
        <AboutCard :fit-phone="false"></AboutCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AboutCard from "@/components/AboutCard";
import { mapState } from "vuex";
export default {
  name: "About",
  components: { AboutCard },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
    }),
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
.aboutBase {
  max-width: 1024px;
}
</style>
