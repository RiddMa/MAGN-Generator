<template>
  <div>
    <a-collapse :bordered="false">
      <a-collapse-panel key="1" header="选项">
        <a-row>
          <a-col flex="auto"></a-col>
          <a-col :xxl="11" :xl="15" :lg="17" :md="19" :sm="22" :xs="24">
            <a-input-search
              v-model:value="searchText"
              placeholder="输入电影名称…"
              enter-button="确认"
              size="large"
              allowclear
              @search=""
            />
          </a-col>
          <a-col flex="auto"></a-col>
        </a-row>
        <a-row>

        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      searchText: "The Shawshank Redemption",
    };
  },
};
</script>

<style scoped></style>