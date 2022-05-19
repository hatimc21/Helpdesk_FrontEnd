import { createRouter, createWebHistory } from 'vue-router'
import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from '../views/pages/auth/Index.vue'
import Ticket from '../views/pages/ticket/Index.vue'
import Employee from '../views/pages/employee/Index.vue'
import Report from '../views/pages/report/Index.vue'
import Layout from '../views/layout/Layout.vue'
Vue.use(VueRouter);
const routes = [
      {
        name: "login",
        path: "/login",
        component: SignIn
       
      },
      {
        name: "login",
        path: "/",
        component: SignIn
      },
      {
        path: "/tickets",
        name: "tickets",
        component: Ticket
      },
      {
        path: "/employees",
        name: "employees",
        component: Employee
      },
      {
        path: "/reports",
        name: "reports",
        component: Report
      },
      {
        path: "*",
        redirect: "/404",
      },
      {
        path:"/layout",
        name: "layout",
        component: Layout
      },
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/pages/error/Index"),
      },
    ]
const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
