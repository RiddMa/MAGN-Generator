import { createApp } from "vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Button,
  Spin,
  Result,
  Card,
  Divider,
  Col,
  Row,
  Drawer,
  Table,
  Form,
  InputNumber,
  Tag,
  Rate,
  Space,
  Input,
  Collapse,
  Typography,
  BackTop,
  Checkbox,
} from "ant-design-vue";
import App from "./App.vue";

const app = createApp(App);
// app.config.productionTip = false;
app.use(Layout);
app.use(Button);
app.use(Spin);
app.use(Result);
app.use(Card);
app.use(Divider);
app.use(Col);
app.use(Row);
app.use(Drawer);
app.use(Table);
app.use(Form);
app.use(InputNumber);
app.use(Tag);
app.use(Rate);
app.use(Space);
app.use(Input);
app.use(Collapse);
app.use(Typography);
app.use(BackTop);
app.use(Checkbox);
app.use(store).use(router).mount("#app");
