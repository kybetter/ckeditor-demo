import Vue from "vue";
import App from "./App.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(CKEditor);
Vue.use(Antd);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
