import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "normalize.css";

const app = createApp(App);

app
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
    size: "small",
  })
  .mount("#app");
