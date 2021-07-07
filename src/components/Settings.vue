<template>
  <div>
    <a-collapse v-model:activeKey="activeKey" :bordered="false">
      <a-collapse-panel key="1" header="选项">
        <a-row>
          <a-col flex="auto"></a-col>
          <a-col :xxl="11" :xl="15" :lg="17" :md="19" :sm="22" :xs="24">
            <a-space direction="vertical" style="width: 100%"> </a-space>
            <a-row class="searchRow">
              <a-input-search
                v-model:value="movie.title"
                placeholder="输入电影名称…"
                enter-button="确认"
                size="large"
                allowClear
                @search=""
              />
            </a-row>
            <a-row class="searchRow">
              <a-col :span="17">
                <a-input
                  v-model:value="movie.titleCN"
                  placeholder="输入电影中文名称…"
                  allowClear
                  @pressEnter=""
                />
              </a-col>
              <a-col flex="auto"></a-col>
              <a-col :span="6">
                <a-input
                  v-model:value="movie.year"
                  placeholder="输入电影年份…"
                  allowClear
                  @pressEnter=""
                />
              </a-col>
            </a-row>
            <a-row v-if="!fitPhone" class="searchRow">
              <a-checkbox-group
                v-model:value="genreChecked"
                @change="setMovieGenre"
              >
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
              </a-checkbox-group>
            </a-row>
          </a-col>
          <a-col flex="auto"></a-col>
        </a-row>
        <a-row> </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { NCheckbox, NCheckboxGroup } from "naive-ui";

import { ref } from "vue";
import { defineComponent, reactive, toRefs } from "vue";

const { useMessage } = require("naive-ui");
export default {
  name: "Settings",
  components: {
    NCheckbox,
    NCheckboxGroup,
  },

  data() {
    return {};
  },
  setup() {
    const activeKey = ref([1]);
    const genreRef = ref(null);

    return {
      activeKey,
      genreChecked: genreRef,
    };
  },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      movie: (state) => state.movie,
    }),
    ...mapGetters({
      genreList: "genreList",
    }),
  },
  mounted() {
    this.setMovieGenre(this.genreList);
  },
  methods: {
    onCheckboxChange() {},
    setMovieGenre(newGenre) {
      this.genreChecked = newGenre;
      this.$store.commit("setMovieGenre", newGenre);

      // console.log(JSON.stringify(value));
    },
  },
};
</script>

<style scoped>
.searchRow {
  margin: 0 0 2vh 0;
}
.genreCheckbox {
  width: 100px;
  text-align: start;
}
.checkboxCol {
}
.ant-checkbox-group {
  width: 100%;
}
</style>
