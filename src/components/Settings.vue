<template>
  <div>
    <a-collapse :bordered="false">
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
            <a-row class="searchRow">
              <a-checkbox-group
                class="genreCheckbox"
                v-model:value="genreChecked"
                name="genreCheckbox"
                :options="genreOptions"
                @change="onCheckboxChange"
              >

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
import { mapState } from "vuex";
export default {
  name: "Settings",
  data() {
    return {
      genreOptions: [
        {
          label: "动作",
          value: "action",
        },
        {
          label: "科幻",
          value: "sci_fi",
        },
        {
          label: "冒险",
          value: "adventure",
        },
        {
          label: "剧情",
          value: "drama",
        },
        {
          label: "动画/动漫",
          value: "animation",
        },
        {
          label: "奇幻/幻想",
          value: "fantasy",
        },
        {
          label: "悬疑/惊险",
          value: "thriller",
        },
        {
          label: "历史/纪录",
          value: "historical",
        },
        {
          label: "喜剧",
          value: "comedy",
        },
        {
          label: "恐怖",
          value: "horror",
        },
      ],
    };
  },
  setup() {},
  computed: {
    genreChecked() {
      return ["drama"];
    },
    ...mapState({
      movie: (state) => state.movie,
    }),
  },
  methods: {
    onCheckboxChange() {},
  },
};
</script>

<style scoped>
.searchRow {
  margin: 0 0 2vh 0;
}
.genreCheckbox{

}
</style>
