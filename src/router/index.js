import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/Home"),
    redirect: "/welcome",
    children: [
      {
        name: "welcome",
        path: "/welcome",
        meta: {
          title: "欢迎来到毕业照管理系统",
        },
        component: () => import("@/views/Welcome"),
      },
      {
        name: "college",
        path: "/college",
        meta: {
          title: "学院信息",
        },
        component: () => import("@/views/College"),
      },
      {
        name: "marjor",
        path: "/marjor",
        meta: {
          title: "专业信息",
        },
        component: () => import("@/views/Marjor"),
      },
      {
        name: "infomation",
        path: "/infomation",
        meta: {
          title: "毕业照信息",
        },
        component: () => import("@/views/Infomation"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
