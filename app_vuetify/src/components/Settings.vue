<template>
  <v-container class="px-0">
    <v-expansion-panels class="settings" focusable popout>
      <v-expansion-panel class="settings">
        <v-expansion-panel-header class="pb-4 pt-auto px-auto">
          信息
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="my-6 mx-3 px-auto">
            <v-row>
              <v-text-field
                class="text-body-1 text--primary"
                v-model="movie.title"
                type="text"
                label="标题"
                placeholder="请输入电影英文标题……"
                :color="'#40ba83'"
                autofocus
                clearable
                validate-on-blur
                :loading="loading"
                :disabled="loading"
                @keydown.enter="titleHandler"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="text-body-1 text--primary"
                v-model="movie.titleCN"
                type="text"
                label="中文标题"
                placeholder="请输入电影中文标题……"
                :color="'#40ba83'"
                clearable
                validate-on-blur
                :loading="loading"
                :disabled="loading"
                @keydown.enter="titleCNHandler"
              ></v-text-field>
              <v-text-field
                class="text-body-1 text--primary"
                v-model="movie.year"
                type="number"
                label="上映年份"
                placeholder="请输入电影上映年份……"
                :color="'#40ba83'"
                clearable
                validate-on-blur
                :loading="loading"
                :disabled="loading"
                @change="validateYear"
                @input="validateYear"
                @keydown.enter="enterBlur"
              ></v-text-field>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
const moment = require("moment");

export default {
  name: "Settings",
  data() {
    return {
      loading: false,
      maxYear: parseInt(moment().year().toFixed()) + 1,
    };
  },
  computed: {
    genreChecked: {
      get() {
        return this.$store.getters.genreList;
      },
      set(newGenre) {
        this.$store.commit("setMovieGenre", newGenre);
      },
    },
    movie: {
      get() {
        return this.$store.state.movie;
      },
      set(movieAttr) {
        this.$store.commit("setMovie", movieAttr);
      },
    },
    ...mapState({
      fitPhone: (state) => state.fitPhone,
    }),
    ...mapGetters({
      genreList: "genreList",
    }),
  },
  mounted() {},
  methods: {
    onSearch() {},
    onClearAllClicked() {
      this.$store.commit("clearMovie");
      this.$store.commit("updateRadar");
    },
    enterBlur(event) {
      event.target.blur();
    },
    validateYear() {
      if (this.movie.year >= this.maxYear) {
        this.movie.year = this.maxYear;
      } else if (this.movie.year <= 1888) {
        this.movie.year = 1888;
      }
    },
  },
};
</script>

<style scoped>
.settings {
  border-width: 2px;
  border-color: #36b079;
}
.searchRow {
  margin: 0 0 2vh 0;
}
.genreCheckbox {
  width: 110px;
  text-align: start;
}
.checkboxRow {
  margin-bottom: 0.5em;
}
.checkboxCol {
}
.ant-checkbox-group {
  width: 100%;
}
.inputField {
  width: 100%;
}
.searchButton {
  margin-left: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
