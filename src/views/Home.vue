<template>
  <div class="home">
    <Settings></Settings>
    <Review class="toImage" id="toImage" ref="toImage"></Review>
    <a-button @click="capture">capture</a-button>
    <a-button @click="clickGeneratePicture">clickgen</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Review from "@/components/Review";
import Settings from "@/components/Settings";
import html2canvas from "html2canvas";

export default {
  name: "Home",
  components: {
    Review,
    Settings,
  },
  data() {
    return {
      imgURL: "",
    };
  },
  methods: {
    /**
     * 将页面指定节点内容转为图片
     * 1.拿到想要转换为图片的内容节点DOM；
     * 2.转换，拿到转换后的canvas
     * 3.转换为图片
     */
    clickGeneratePicture() {
      //解决截屏时，滚动条隐藏部分不能截取问题
      const imgWidth = this.$refs.toImage.clientWidth; // 具体内容的宽度
      const imgHeight = this.$refs.toImage.clientHeight; // 具体内容的高度
      const targetDom = document.querySelector(".toImage");
      let copyDom = targetDom.cloneNode(true);
      copyDom.style.width = imgWidth;
      copyDom.style.height = imgHeight;
      document.querySelector("body").appendChild(copyDom);

      const options = { useCORS: true, backgroundColor: null };
      html2canvas(copyDom, options).then((canvas) => {
        document.body.appendChild(canvas);
        this.imgURL = canvas.toDataURL("image/png");
        //必须同源（访问的网站域名与服务器域名一致）才能下载
        console.log(this.imgURL);

        // const eleLink = document.createElement("a");
        // eleLink.href = this.imgURL; // 转换后的图片地址
        // eleLink.download = +new Date() + "_实时采集数据";
        // document.body.appendChild(eleLink);
        // // 触发点击
        // eleLink.click();
        // // 然后移除
        // document.body.removeChild(eleLink);
        // document.body.removeChild(copyDom);
      });
    },
    click2() {
      const download = () => {
        html2canvas("toImage", {
          backgroundColor: "white",
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/jpeg");
          fileDownload(imgData);
        });
      };
      const fileDownload = (imgData) => {
        const aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = imgData;
        aLink.download = "xx.png";
        // 触发点击-然后移除
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      };
    },
    capture() {
      const rect = document.querySelector("#toImage").getBoundingClientRect();
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
      console.log(document.querySelector("#toImage").getBoundingClientRect()); //eslint-disable-line
      html2canvas(document.querySelector("#toImage"), {
        width: rect.width,
        height: rect.height,
        scrollY: -scrollTop, // 页面存在滚动时，需要设置此属性，解决绘图偏移问题
      }).then(function (canvas) {
        document.body.appendChild(canvas);
      });
    },
  },
};
</script>
