<template>
  <v-container id="aboutBase" fluid>
    <v-row>
      <v-col class="aboutBase ma-auto">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              class="aboutCard ma-4 px-6 py-6 transition-swing"
              :elevation="hover ? 12 : 6"
              outlined
            >
              <v-card-title
                id="aboutTitle"
                class="awesomeTitle text-h3 ma-auto pa-auto align-baseline"
              >
                MAG(N) 影评
                <v-spacer></v-spacer>
                <span class="text-body-1 text--primary">当前版本：v2.0.0</span>
              </v-card-title>
              <v-card-text class="aboutText ma-auto pa-auto text--primary">
                <p class="text-h6 mx-0 mt-3 mb-1 pa-0">使用指南</p>
                ①前往“新建”页面。<br />
                ②默认展示影评示例，点击“清空全部”按钮可以清空关于影片的所有信息。（包括影片本身信息及打分、评论）<br />
                ③在“信息”中填写影片英文标题、中文标题、年份，并在下方点选影片所属类型（影片分类参考了
                <a
                  href="https://en.wikipedia.org/wiki/Film_genre"
                  rel="noopener"
                  target="_blank"
                  >维基百科
                </a>
                ）。未来，将会加入在输入框直接进行豆瓣、IMDb搜索功能。<br />
                ④从四个维度，对影片进行评分。也可以在下方卡片，点击星星进行打分。评分维度参考了学院奖奖项设置。<br />
                ⑤信息填写完毕，在下方卡片，可以预览生成海报图片样式。<br />
                ⑥在卡片最下方输入框，输入影评内容。<br />
                ⑦点击”保存至云端“按钮存储数据到服务器。注：密码自输入开始全程加密存储，但影评相关数据并不会加密。
                <p class="text-h6 mx-0 mt-3 mb-1 pa-0">目前实现的功能</p>
                用户系统：注册/登录，同一浏览器自动记住登录，使用MD5+HTTPS+Scrypt-KDF+JsonWebToken实现。<br />
                影评系统：填写电影信息，从四个维度进行0-10星评分并撰写评价，对信息及评价进行展示。在用户界面，显示所有影评的列表并能选择某个影评进行增删查改。<br />
                图片生成：<s>服务端渲染生成分享截图。</s>（优化中，暂未开放）<br />
                待完成：<u>移动端界面优化</u>，界面动效帧数，用户数据搜索展示优化，豆瓣IMDb关联搜索，二刷/多刷记录功能。
                <p class="text-h6 mx-0 mt-3 mb-1 pa-0">用途？</p>
                记录个人观影进度，并生成高质量的分享图片供发朋友圈使用。
                <p class="text-h6 mx-0 mt-3 mb-1 pa-0">相关链接</p>
                <a
                  href="https://github.com/RiddMa/MAGN-Generator"
                  rel="noopener"
                  target="_blank"
                >
                  Github
                </a>
                <p class="text-h6 text-right mx-0 mt-3 mb-1 pa-0">
                  ——Designed by Ridd.
                </p>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      test: false,
    };
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
.aboutCard {
  border-color: #40ba83;
  border-width: 2px;
}
.awesomeTitle {
  color: #40ba83;
}
</style>
