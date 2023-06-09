import VueRouter from 'vue-router'

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare var JsonExcel: any;
declare module "vue-json-excel" {
  export = JsonExcel;
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
  }
}

declare module './views/DataTable.vue';