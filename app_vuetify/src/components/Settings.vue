<template>
  <div>
    <a-collapse v-model:activeKey="activeKey" :bordered="false">
      <a-collapse-panel key="1" header="选项&nbsp&nbsp&nbsp&nbsp">
        <a-row>
          <a-col flex="auto"></a-col>
          <a-col :xxl="11" :xl="15" :lg="17" :md="19" :sm="22" :xs="24">
            <a-space direction="vertical" style="width: 100%"> </a-space>
            <a-row class="searchRow">
              <a-input
                class="inputField"
                v-model:value="movie.title"
                placeholder="输入电影名称…"
                size="large"
                @pressEnter="onSearch"
                allowClear
              >
                <template #prefix>
                  <SearchOutlined />
                </template>
                <template #suffix>
                  <a-button
                    class="searchButton"
                    type="primary"
                    @click="onSearch"
                    >确认</a-button
                  >
                </template>
              </a-input>
            </a-row>
            <a-row class="searchRow">
              <a-col :span="18">
                <a-input
                  class="inputField"
                  v-model:value="movie.titleCN"
                  placeholder="输入电影中文名称…"
                  allowClear
                  @pressEnter="enterBlur"
                />
              </a-col>
              <a-col :span="1"></a-col>
              <a-col :span="5">
                <a-input-number
                  class="inputField"
                  v-model:value="movie.year"
                  placeholder="输入电影年份…"
                  :max="maxYear"
                  :min="1888"
                  @pressEnter="enterBlur"
                />
              </a-col>
            </a-row>
            <a-row class="searchRow">
              <a-checkbox-group v-model:value="genreChecked">
                <div v-if="!fitPhone">
                  <a-row style="margin-bottom: 1vh">
                    <a-col flex="auto"></a-col>
                    <a-col class="checkboxCol">
                      <a-space>
                        <a-checkbox
                          class="genreCheckbox"
                          value="action"
                          name="type"
                        >
                          动作
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="sci_fi"
                          name="type"
                        >
                          科幻
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="adventure"
                          name="type"
                        >
                          冒险
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="drama"
                          name="type"
                        >
                          剧情
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="animation"
                          name="type"
                        >
                          动漫/动画
                        </a-checkbox>
                      </a-space>
                    </a-col>
                    <a-col flex="auto"></a-col>
                  </a-row>
                  <a-row>
                    <a-col flex="auto"></a-col>
                    <a-col class="checkboxCol">
                      <a-space>
                        <a-checkbox
                          class="genreCheckbox"
                          value="fantasy"
                          name="type"
                        >
                          奇幻/幻想
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="thriller"
                          name="type"
                        >
                          悬疑/惊险
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="historical"
                          name="type"
                        >
                          历史/记录
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="comedy"
                          name="type"
                        >
                          喜剧
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="horror"
                          name="type"
                        >
                          恐怖
                        </a-checkbox>
                      </a-space>
                    </a-col>
                    <a-col flex="auto"></a-col>
                  </a-row>
                </div>
                <div v-if="fitPhone">
                  <a-row class="checkboxRow">
                    <a-col flex="auto"></a-col>
                    <a-col class="checkboxCol">
                      <a-space>
                        <a-checkbox
                          class="genreCheckbox"
                          value="action"
                          name="type"
                        >
                          动作
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="sci_fi"
                          name="type"
                        >
                          科幻
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="adventure"
                          name="type"
                        >
                          冒险
                        </a-checkbox>
                      </a-space>
                    </a-col>
                    <a-col flex="auto"></a-col>
                  </a-row>
                  <a-row class="checkboxRow">
                    <a-col flex="auto"></a-col>
                    <a-col class="checkboxCol">
                      <a-space>
                        <a-checkbox
                          class="genreCheckbox"
                          value="drama"
                          name="type"
                        >
                          剧情
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="animation"
                          name="type"
                        >
                          动漫/动画
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="fantasy"
                          name="type"
                        >
                          奇幻/幻想
                        </a-checkbox>
                      </a-space>
                    </a-col>
                    <a-col flex="auto"></a-col>
                  </a-row>
                  <a-row class="checkboxRow">
                    <a-col flex="auto"></a-col>
                    <a-col class="checkboxCol">
                      <a-space>
                        <a-checkbox
                          class="genreCheckbox"
                          value="thriller"
                          name="type"
                        >
                          悬疑/惊险
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="historical"
                          name="type"
                        >
                          历史/记录
                        </a-checkbox>
                        <a-checkbox
                          class="genreCheckbox"
                          value="comedy"
                          name="type"
                        >
                          喜剧
                        </a-checkbox>
                      </a-space>
                    </a-col>
                    <a-col flex="auto"></a-col>
                  </a-row>
                  <a-row class="checkboxRow">
                    <a-col flex="auto"></a-col>
                    <a-col class="checkboxCol">
                      <a-space>
                        <a-checkbox
                          class="genreCheckbox"
                          value="horror"
                          name="type"
                        >
                          恐怖
                        </a-checkbox>
                      </a-space>
                    </a-col>
                    <a-col flex="auto"></a-col>
                  </a-row>
                </div>
              </a-checkbox-group>
            </a-row>
            <a-row>
              <a-col flex="auto"></a-col>
              <a-col>
                <a-button type="primary" @click="onClearAllClicked"
                  >清空全部</a-button
                >
              </a-col>
              <a-col flex="auto"></a-col>
            </a-row>
          </a-col>
          <a-col flex="auto"></a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
const moment = require("moment");

export default {
  name: "Settings",

  data() {
    return {
      maxYear: parseInt(moment().year().toFixed()) + 1,
    };
  },
  setup() {
    const activeKey = ref([1]);
    return {
      activeKey,
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
  },
};
</script>

<style scoped>
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
</style>
