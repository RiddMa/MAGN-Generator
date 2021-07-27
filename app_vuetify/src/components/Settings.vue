<template>
  <v-container class="px-0">
    <v-expansion-panels class="settings" hover popout v-model="showSettings">
      <v-expansion-panel class="settings">
        <v-expansion-panel-header class="pb-4 pt-auto px-auto">
          信息
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="my-6 mx-2 px-auto">
            <v-row>
              <v-text-field
                class="text-body-1 text--primary"
                v-model="movie.title"
                type="text"
                label="标题"
                placeholder="请输入电影英文标题……"
                :color="'#40ba83'"
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
              <v-spacer></v-spacer>
              <v-checkbox
                :input-value="showYear"
                hide-details
                class="shrink ml-auto mr-2 my-auto align-center"
                @change="toggleShowYear"
              ></v-checkbox>
              <v-text-field
                class="no-counter text-body-1 text--primary"
                v-model.number="year"
                type="number"
                label="上映年份"
                placeholder="请输入电影上映年份……"
                prepend-inner-icon="mdi-minus"
                @click:prepend-inner="year -= 1"
                append-icon="mdi-plus"
                @click:append="year += 1"
                :color="'#40ba83'"
                :loading="loading"
                :disabled="loading || !showYear"
                @keydown.enter="enterBlur"
                style="max-width: 175px"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-chip-group class="mb-4" v-model="genreChecked" column multiple>
                <template v-for="item in genreTags">
                  <v-chip
                    :key="item.genre"
                    :value="item.genre"
                    :ripple="false"
                    label
                    filter
                    outlined
                    v-blur
                  >
                    {{ item.genreCN }}
                  </v-chip>
                </template>
              </v-chip-group>
            </v-row>
            <v-row>
              <v-hover :value="showClearCheck">
                <template v-slot:default="{ hover }">
                  <v-scale-transition
                    origin="left center 0"
                    leave-absolute
                    mode="out-in"
                  >
                    <v-btn
                      v-if="!showClearCheck"
                      outlined
                      color="red"
                      @click.stop="showClearCheck = true"
                      :elevation="hover ? 4 : 0"
                    >
                      清空全部
                    </v-btn>
                  </v-scale-transition>
                </template>
              </v-hover>
              <v-scale-transition
                origin="left center 0"
                leave-absolute
                mode="out-in"
              >
                <v-btn
                  id="clearCheckAgain"
                  v-if="showClearCheck"
                  outlined
                  color="red"
                  @click.stop="onClearAllChecked"
                  v-click-outside="onClearAllClickOutside"
                >
                  再次点击以清空全部!
                </v-btn>
              </v-scale-transition>
              <v-spacer></v-spacer>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-btn
                    outlined
                    color="primary"
                    :elevation="hover ? 4 : 0"
                    @click="showSettings = undefined"
                  >
                    保存至云端
                  </v-btn>
                </template>
              </v-hover>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Settings",
  data() {
    return {
      loading: false,
      showSettings: 0,
      showYear: true,
      showClearCheck: false,
      tmpYear: 0,
    };
  },
  computed: {
    genreChecked: {
      get() {
        return this.$store.getters.genreList;
      },
      set(newGenreList) {
        this.$store.commit("setMovieGenre", newGenreList);
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
    year: {
      get() {
        return this.$store.state.movie.year;
      },
      set(newYear) {
        this.$store.commit("setMovieYear", newYear);
      },
    },
    ...mapState({
      fitPhone: (state) => state.fitPhone,
    }),
    ...mapGetters({
      genreList: "genreList",
      genreTags: "genreTags",
    }),
  },
  mounted() {},
  methods: {
    onSearch() {},
    onClearAllClickOutside() {
      if (this.showClearCheck) {
        document.getElementById("clearCheckAgain").style.position = "absolute";
        this.showClearCheck = false;
      }
    },
    onClearAllChecked() {
      document.getElementById("clearCheckAgain").style.position = "absolute";
      this.$store.commit("clearMovie");
      this.$store.dispatch("updateRadar");
      this.showClearCheck = false;
    },
    enterBlur(event) {
      event.target.blur();
    },
    toggleShowYear() {
      this.showYear = !this.showYear;
      if (this.showYear) {
        this.$store.commit("setMovieYear", this.tmpYear);
      } else {
        this.tmpYear = this.year;
        this.$store.commit("setMovieYear", 0);
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
::v-deep .no-counter input[type="number"] {
  -moz-appearance: textfield;
}
::v-deep .no-counter input::-webkit-outer-spin-button,
::v-deep .no-counter input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
