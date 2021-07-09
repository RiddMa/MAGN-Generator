<template>
  <div class="about">
    <a-row class="toImage" id="toImage" ref="toImage">
      <a-col flex="auto"></a-col>
      <a-col :xxl="14" :xl="16" :lg="18" :md="20" :sm="22" :xs="24">
        <a-card hoverable>
          <a-typography-title class="awesomeTitle">
            MAG(N) 影评生成器
          </a-typography-title>
          <a-typography-title class="aboutText" :level="2"
            >用途？
          </a-typography-title>
          <a-typography-paragraph class="aboutText">
            记录个人观影进度，并生成高质量的海报图片供发朋友圈使用。
          </a-typography-paragraph>
          <a-typography-title class="aboutText" :level="2"
            >使用指南
          </a-typography-title>
          <a-typography-paragraph class="aboutText">
            前往“Home”页面，在“选项”中填写影片英文标题、中文标题、年份，并在下方勾选影片所属类型。（影片分类参考了
            <a-typography-link
              href="https://en.wikipedia.org/wiki/Film_genre"
              rel="noopener"
              target="_blank"
              >维基百科
            </a-typography-link>
            ），点击“清空全部”按钮可以清空关于影片的所有信息（包括影片本身信息及打分、评论）。
          </a-typography-paragraph>
          <a-typography-paragraph class="aboutText">
            在下方卡片，可以预览生成海报图片样式。从四个维度，点击星星来进行打分（评分维度参考了学院奖奖项设置）。在最下方输入框，输入影评内容。
          </a-typography-paragraph>
          <a-typography-title class="aboutText" :level="2"
            >相关链接
          </a-typography-title>
          <a-typography-paragraph class="aboutText">
            <a-typography-link
              href="https://github.com/RiddMa/MAGN-Generator"
              rel="noopener"
              target="_blank"
              >Github
            </a-typography-link>
          </a-typography-paragraph>
          <a-typography-title class="awesomeSubTitle" :level="2">
            ——Designed by Ridd.
          </a-typography-title>
        </a-card>
      </a-col>
      <a-col flex="auto"></a-col>
    </a-row>
  </div>
</template>
<script></script>
<style scoped>
.awesomeTitle {
  text-align: start;
  vertical-align: center;
  color: #40ba83;
}
.awesomeSubTitle {
  text-align: end;
  vertical-align: center;
  color: #40ba83;
}
.aboutText {
  text-align: start;
  alignment: left;
}
</style>
