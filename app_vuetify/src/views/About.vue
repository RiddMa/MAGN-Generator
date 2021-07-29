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
                <span class="text-body-1 text--primary">
                  当前版本：v2.0.0-preview1</span
                >
              </v-card-title>
              <!--              <v-btn @click="moveTitle">123</v-btn>-->
              <v-card-text class="aboutText ma-auto pa-auto text--primary">
                <p class="text-h6 mx-0 mt-3 mb-1 pa-0">目前实现的功能</p>
                用户系统：注册/登录，同一浏览器自动记住登录，使用MD5+HTTPS+Scrypt-KDF+JsonWebToken实现。在用户界面，显示所有影评的列表并选择某个影评进行增删查改。<br />
                影评系统：填写电影英文标题、中文标题、年份；选择电影类型；从四个维度进行0-10星评分，计算平均分并显示评分雷达图。<br />
                图片生成：<s>服务端渲染生成分享截图。</s>（优化中，暂未开放）<br />
                待完成：<u>移动端界面优化</u>，界面动效与外观优化（如切换选项卡动画），用户数据搜索展示优化，影评记录查看，豆瓣IMDb关联搜索。二刷/多刷记录功能。
                <p class="text-h6 mx-0 mt-3 mb-1 pa-0">用途？</p>
                记录个人观影进度，并生成高质量的分享图片供发朋友圈使用。
                <p class="text-h6 mx-0 mt-3 mb-1 pa-0">使用指南</p>
                前往“Home”页面。<br />
                在“选项”中填写影片英文标题、中文标题、年份，并在下方点选影片所属类型。（影片分类参考了
                <a
                  href="https://en.wikipedia.org/wiki/Film_genre"
                  rel="noopener"
                  target="_blank"
                  >维基百科
                </a>
                ）<br />
                点击“清空全部”按钮可以清空关于影片的所有信息。（包括影片本身信息及打分、评论）<br />
                <s>在下方卡片，可以预览生成海报图片样式。</s><br />
                从四个维度，点击星星来进行打分（评分维度参考了学院奖奖项设置）。<br />
                在最下方输入框，输入影评内容。<br />
                信息填写完毕后，点击”保存至云端“按钮存储数据到服务器。
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
import { aboutIn, aboutOut } from "@/utils/animate";

export default {
  name: "About",
  data() {
    return {};
  },
  methods: {
    moveTitle() {
      aboutOut();
    },
  },
  mounted() {
    // aboutIn();
  },
  beforeDestroy() {
    // aboutOut();
  },
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
.awesomeSubTitle {
  color: #40ba83;
}
</style>
