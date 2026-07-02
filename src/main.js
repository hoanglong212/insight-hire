import { createApp } from "vue";
import { App, router } from "./browser-runtime.js";

createApp(App).use(router).mount("#app");
