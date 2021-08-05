<template>
  <v-container fluid class="px-0">
    <v-expansion-panels hover popout v-model="showSettings">
      <v-expansion-panel>
        <v-expansion-panel-header class="pb-4 pt-auto px-auto"> 信息 </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="my-6 mx-2 px-auto">
            <v-row>
              <v-text-field
                class="text-body-1 primary--text"
                v-model="movie.title"
                type="text"
                label="标题"
                placeholder="请输入电影英文标题……"
                clearable
                validate-on-blur
                :loading="loading"
                :disabled="loading"
                @keydown.enter="titleHandler"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="text-body-1 primary--text"
                v-model="movie.titleCN"
                type="text"
                label="中文标题"
                placeholder="请输入电影中文标题……"
                clearable
                validate-on-blur
                :loading="loading"
                :disabled="loading"
                @keydown.enter="titleCNHandler"
              ></v-text-field>
            </v-row>
            <v-row style="white-space: nowrap; display: flex; flex-direction: row; flex-wrap: nowrap">
              <v-checkbox
                :input-value="showYear"
                hide-details
                :disabled="loading"
                class="shrink ml-auto mr-2 mb-6 align-baseline"
                @change="toggleShowYear"
              ></v-checkbox>
              <v-text-field
                class="no-counter text-body-1 primary--text"
                v-model="year"
                type="number"
                label="上映年份"
                placeholder="请输入电影上映年份……"
                prepend-inner-icon="mdi-minus"
                @click:prepend-inner="year -= 1"
                append-icon="mdi-plus"
                @click:append="year += 1"
                :loading="loading"
                :disabled="loading || !showYear"
                @keydown.enter="enterBlur"
                maxlength="4"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-chip-group class="mb-4" v-model="genreChecked" column multiple>
                <template v-for="item in genreTags">
                  <v-chip :key="item.genre" :value="item.genre" :ripple="false" label filter outlined v-blur>
                    {{ item.genreCN }}
                  </v-chip>
                </template>
              </v-chip-group>
            </v-row>
            <v-row>
              <RatingInput
                class="ratingInputPhone"
                desc="剧情"
                :rating.sync="movie.rating.screenplay"
                :loading="loading"
              ></RatingInput>
            </v-row>
            <v-row>
              <RatingInput
                class="ratingInputPhone"
                desc="视效/摄影"
                :rating.sync="movie.rating.visual"
                :loading="loading"
              ></RatingInput>
            </v-row>
            <v-row>
              <RatingInput
                class="ratingInputPhone"
                desc="演出/剪辑"
                :rating.sync="movie.rating.editing"
                :loading="loading"
              ></RatingInput>
            </v-row>
            <v-row>
              <RatingInput
                class="ratingInputPhone"
                desc="音乐/音效"
                :rating.sync="movie.rating.sound"
                :loading="loading"
              ></RatingInput>
            </v-row>

            <template v-if="mode === 'new'">
              <v-row class="my-4">
                <v-hover :value="showClearCheck">
                  <template v-slot:default="{ hover }">
                    <v-btn
                      class="outlineBtn text-button"
                      outlined
                      color="error"
                      @click.stop="onClearClicked"
                      :elevation="hover ? 6 : 2"
                      :loading="loading"
                      :disabled="loading"
                    >
                      <v-icon dense class="mr-1">mdi-delete-outline</v-icon>
                      清空全部
                    </v-btn>
                  </template>
                </v-hover>
                <v-spacer></v-spacer>
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn
                      class="outlineBtn text-button success--text"
                      outlined
                      :elevation="hover ? 6 : 2"
                      @click="onSaveRenderClicked"
                      :loading="loading"
                    >
                      <v-icon dense class="mr-1">mdi-image</v-icon>
                      保存并渲染
                    </v-btn>
                  </template>
                </v-hover>
              </v-row>
              <v-row class="mt-6">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn
                      class="outlineBtn text-button"
                      block
                      color="success"
                      :elevation="hover ? 6 : 2"
                      @click="sendReview"
                      :loading="loading"
                    >
                      <v-icon dense class="mr-1">mdi-content-save</v-icon>
                      保存至云端
                    </v-btn>
                  </template>
                </v-hover>
              </v-row>
            </template>
            <template v-if="mode === 'edit'">
              <v-row class="justify-space-between my-4">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn
                      class="outlineBtn text-button mr-2 grow"
                      color="error"
                      outlined
                      @click.stop="onDeleteClicked"
                      :elevation="hover ? 6 : 2"
                      :loading="loading"
                    >
                      <v-icon dense class="mr-1">mdi-delete-forever-outline</v-icon>
                      删除
                    </v-btn>
                  </template>
                </v-hover>
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn
                      class="outlineBtn text-button ml-2 grow"
                      color="body"
                      outlined
                      :elevation="hover ? 6 : 2"
                      @click="cancelUpdate"
                      :loading="loading"
                    >
                      <v-icon dense>mdi-chevron-left</v-icon>
                      取消
                    </v-btn>
                  </template>
                </v-hover>
              </v-row>
              <v-row class="justify-lg-space-between mt-6">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn
                      class="outlineBtn text-button success--text mr-2 grow"
                      outlined
                      :elevation="hover ? 6 : 2"
                      @click="onUpdateRenderClicked"
                      :loading="loading"
                    >
                      <v-icon dense class="mr-1">mdi-image</v-icon>
                      保存并渲染
                    </v-btn>
                  </template>
                </v-hover>
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-btn
                      class="text-button ml-2 grow"
                      color="success"
                      :elevation="hover ? 6 : 2"
                      @click="updateReview"
                      :loading="loading"
                    >
                      <v-icon dense class="mr-1">mdi-content-save</v-icon>
                      保存并返回
                    </v-btn>
                  </template>
                </v-hover>
              </v-row>
            </template>
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
  name: "SettingsPhone",
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
      showSettings: undefined,
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
        if (newYear.toString().length === 4 && !newYear.toString().includes(".")) {
          this.$store.commit("setMovieYear", newYear);
        }
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
  methods: {
    /*
    create mode
     */
    async onSaveRenderClicked() {
      this.loading = true;
      await this.$store.dispatch("saveUserReview", this.$store.state.movie);
      await this.$store.dispatch("generatePoster");
      this.loading = false;
      this.$store.commit("showToast", { type: "success", message: "生成成功" });
      await this.$router.push(`/poster/${this.movie.reviewId}`);
    },
    onClearClicked() {
      this.$store.commit("showToast", {
        dialog: true,
        type: "clearMovie",
        message: "清空所有信息？包括影片信息、评分、评价",
      });
    },
    async sendReview() {
      this.loading = true;
      if (await this.$store.dispatch("isUserLoggedIn")) {
        await this.$store.dispatch("saveUserReview", this.$store.state.movie);
      } else {
        this.$store.commit("setPending", "saveUserReview");
        await this.$router.push("/login");
      }
      this.loading = false;
      this.showSettings = undefined;
    },
    /*
    create mode
     */
    /*
    edit mode
     */
    async onUpdateRenderClicked() {
      this.loading = true;
      await this.$store.dispatch("updateUserReview", this.$store.state.movie);
      await this.$store.dispatch("generatePoster");
      this.loading = false;
      this.$store.commit("showToast", { type: "success", message: "生成成功" });
      await this.$router.push(`/poster/${this.movie.reviewId}`);
    },
    async onDeleteClicked() {
      this.$store.commit("showToast", {
        dialog: true,
        type: "deleteMovie",
        message: "删除此影评？",
      });
    },
    async cancelUpdate() {
      this.$store.commit("setIsEditing", false);
      await this.$router.replace("/user");
    },
    async updateReview() {
      this.loading = true;
      await this.$store.dispatch("updateUserReview", this.$store.state.movie);
      this.loading = false;
      this.$store.commit("setIsEditing", false);
      await this.$router.replace("/user");
    },
    /*
    edit mode
     */
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
  mounted() {
    setTimeout(() => {
      this.showSettings = 0;
    }, 750);
  },
};
</script>

<style src="../styles/customButton.css" scoped></style>
<style scoped>
::v-deep .no-counter input[type="number"] {
  -moz-appearance: textfield;
}
::v-deep .no-counter input::-webkit-outer-spin-button,
::v-deep .no-counter input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.ratingInputPhone {
  width: 100%;
}
</style>
