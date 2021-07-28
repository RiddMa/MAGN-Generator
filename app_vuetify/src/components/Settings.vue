<template>
  <v-container fluid class="px-0">
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
                :disabled="loading"
                class="shrink ml-auto mr-2 mb-6 align-baseline"
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
              <RatingInput
                desc="剧情"
                :rating.sync="movie.rating.screenplay"
                :loading="loading"
              ></RatingInput>
              <v-spacer></v-spacer>
              <RatingInput
                desc="视效/摄影"
                :rating.sync="movie.rating.visual"
                :loading="loading"
              ></RatingInput>
              <v-spacer></v-spacer>
              <RatingInput
                desc="演出/剪辑"
                :rating.sync="movie.rating.editing"
                :loading="loading"
              ></RatingInput>
              <v-spacer></v-spacer>
              <RatingInput
                desc="音乐/音效"
                :rating.sync="movie.rating.sound"
                :loading="loading"
              ></RatingInput>
              <v-spacer></v-spacer>
            </v-row>
            <v-row v-if="mode === 'new'">
              <v-scale-transition
                origin="left center 0"
                leave-absolute
                mode="out-in"
              >
                <v-hover :value="showClearCheck">
                  <template v-slot:default="{ hover }">
                    <v-btn
                      v-if="!showClearCheck"
                      class="mr-2"
                      outlined
                      color="red"
                      @click.stop="showClearCheck = true"
                      :elevation="hover ? 4 : 0"
                      :loading="loading"
                      :disabled="loading"
                    >
                      清空全部
                    </v-btn>
                  </template>
                </v-hover>
              </v-scale-transition>
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
                  :loading="loading"
                  :disabled="loading"
                >
                  <v-icon dense class="mr-1">mdi-alert</v-icon>
                  确认? 点此清空全部
                </v-btn>
              </v-scale-transition>
              <v-spacer></v-spacer>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-btn
                    outlined
                    color="primary"
                    :elevation="hover ? 4 : 0"
                    @click="sendReview"
                    :loading="loading"
                  >
                    保存至云端
                  </v-btn>
                </template>
              </v-hover>
            </v-row>
            <v-row v-if="mode === 'edit'">
              <v-scale-transition
                origin="left center 0"
                leave-absolute
                mode="out-in"
              >
                <v-hover :value="showDeleteCheck">
                  <template v-slot:default="{ hover }">
                    <v-btn
                      v-if="!showDeleteCheck"
                      outlined
                      color="red"
                      @click.stop="showDeleteCheck = true"
                      :elevation="hover ? 4 : 0"
                      :loading="loading"
                    >
                      删除影评
                    </v-btn>
                  </template>
                </v-hover>
              </v-scale-transition>
              <v-scale-transition
                origin="left center 0"
                leave-absolute
                mode="out-in"
              >
                <v-btn
                  id="deleteCheck"
                  v-if="showDeleteCheck"
                  outlined
                  color="red"
                  @click.stop="onDeleteClicked"
                  v-click-outside="onDeleteClickOutside"
                  :loading="loading"
                >
                  <v-icon dense class="mr-1">mdi-alert</v-icon>
                  确认? 点此删除
                </v-btn>
              </v-scale-transition>
              <v-spacer></v-spacer>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-btn
                    outlined
                    class="mr-4"
                    :elevation="hover ? 4 : 0"
                    @click="cancelUpdate"
                    :loading="loading"
                  >
                    取消
                  </v-btn>
                </template>
              </v-hover>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-btn
                    color="primary"
                    :elevation="hover ? 4 : 0"
                    @click="updateReview"
                    :loading="loading"
                  >
                    保存并返回
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
import RatingInput from "@/components/RatingInput";

export default {
  name: "Settings",
  components: { RatingInput },
  props: {
    mode: {
      required: true,
      type: String,
      default() {
        return "new";
      },
    },
  },
  data() {
    return {
      loading: false,
      showSettings: 0,
      showYear: true,
      showClearCheck: false,
      showDeleteCheck: false,
      tmpYear: 0,
      awesome: {
        screenplay: false,
        visual: false,
        editing: false,
        sound: false,
      },
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
    onDeleteClickOutside() {
      if (this.showDeleteCheck) {
        document.getElementById("deleteCheck").style.position = "absolute";
        this.showDeleteCheck = false;
      }
    },
    async onDeleteClicked() {
      this.loading = true;
      await this.$store.dispatch("deleteUserReview", this.movie.reviewId);
      document.getElementById("deleteCheck").style.position = "absolute";
      this.showDeleteCheck = false;
      this.loading = false;
      this.$store.commit("setIsEditing", false);
      await this.$router.replace("/user");
      await this.$store.dispatch("restoreMovie");
    },
    async cancelUpdate() {
      this.$store.commit("setIsEditing", false);
      await this.$router.replace("/user");
      await this.$store.dispatch("restoreMovie");
    },
    async sendReview() {
      this.loading = true;
      if ((await this.$store.dispatch("isUserLoggedIn", this)) === true) {
        await this.$store.dispatch("saveUserReview", this.$store.state.movie);
      } else {
        this.$store.commit("pushPendingQueue", "saveUserReview");
      }
      this.loading = false;
      this.showSettings = undefined;
    },
    async updateReview() {
      this.loading = true;
      await this.$store.dispatch("updateUserReview", this.$store.state.movie);
      this.loading = false;
      this.$store.commit("setIsEditing", false);
      await this.$router.replace("/user");
      await this.$store.dispatch("restoreMovie");
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
    enterBlur(event) {
      event.target.blur();
    },
  },
};
</script>

<style scoped>
.settings {
  border-width: 2px;
  border-color: #36b079;
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
