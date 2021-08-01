import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export const theme = {
  light: {
    body: "#0A331F",
    primary: "#27A166",
    secondary: "#0E4228",
    accent: "#135C38",
    info: "#0A7BC2",
    success: "#27A166",
    warning: "#FFCC00",
    error: "#DB3C30",
  },
  dark: {
    primary: "#27A166",
    secondary: "#0E4228",
    accent: "#135C38",
    info: "#0A7BC2",
    success: "#27A166",
    warning: "#FFCC00",
    error: "#DB3C30",
  },
};

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  theme: {
    options: { customProperties: true, variations: true },
    themes: theme,
  },
});
