<template>
  <div>
    <!--          标题-->
    <a-row align="middle" justify="start" type="flex">
      <a-col :span="24">
        <a-typography-title
          class="awesomeTitle"
          id="awesomeTitle"
          ref="awesomeTitle"
          >{{ movie.title }}
        </a-typography-title>
        <!--        <a-typography-title-->
        <!--          class="awesomeTitle"-->
        <!--          id="awesomeTitle"-->
        <!--          ref="awesomeTitle"-->
        <!--          v-if="!showTitleInput"-->
        <!--          @click="showSearchInput()"-->
        <!--          >{{ movie.title }}-->
        <!--        </a-typography-title>-->
        <!--        <a-input-search-->
        <!--          class="titleSearch"-->
        <!--          v-if="searchText === '' || showTitleInput === true"-->
        <!--          v-model:value="searchText"-->
        <!--          placeholder="输入电影名称…"-->
        <!--          routeEnter-button="确认"-->
        <!--          size="large"-->
        <!--          allowclear-->
        <!--          @search="handleSearch()"-->
        <!--        />-->
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-typography-title
          class="awesomeTitle"
          v-if="!showTitleInput"
          :level="2"
          >{{ movie.titleCN + "." + movie.year }}
        </a-typography-title>
      </a-col>
      <a-col flex="auto"> </a-col>
      <!--      <a-col>-->
      <!--        <a-typography-title-->
      <!--          class="awesomeTitle"-->
      <!--          v-if="!showTitleInput"-->
      <!--          :level="2"-->
      <!--          >{{ movie.year }}-->
      <!--        </a-typography-title>-->
      <!--      </a-col>-->
    </a-row>
    <a-row>
      <a-space>
        <a-tag v-for="genre in genreListCN" class="genreTag">{{ genre }}</a-tag>
      </a-space>
    </a-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Title",
  data() {
    return {
      searchText: this.$store.state.searchText,
    };
  },
  computed: {
    ...mapState({
      fitPhone: (state) => state.fitPhone,
      showTitleInput: (state) => state.showTitleInput,
      showCommentInput: (state) => state.showCommentInput,
      movie: (state) => state.movie,
    }),
    ...mapGetters({
      genreList: "genreList",
      genreListCN: "genreListCN",
    }),
  },
  methods: {
    showSearchInput() {
      this.$store.commit("setTitleInput", true);
    },
    handleSearch() {
      this.$store.commit("setSearchText", this.searchText);
      this.$store.commit("setTitleInput", false);
    },
  },
};
</script>

<style scoped>
.awesomeTitle {
  text-align: start;
  vertical-align: center;
  color: #40ba83;
}
.titleSearch {
  margin: 1vh 0;
  width: 100%;
}
.ant-typography + h2.ant-typography,
.ant-typography + h3.ant-typography,
.ant-typography + h4.ant-typography,
.ant-typography + h5.ant-typography {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
h1.ant-typography,
.ant-typography h1 {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
.genreTag {
  background-color: rgba(255, 255, 255, 0.01);
  border-color: rgba(66, 185, 131, 0.5);
  margin-bottom: 0.5em;
}
</style>
