import { createRouter, createWebHistory } from 'vue-router'
import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from '../views/pages/auth/Index.vue'
import Ticket from '../views/pages/ticket/Index.vue'
import Users from '../views/pages/users/Index.vue'
import Report from '../views/pages/report/Index.vue'
import Layout from '../views/layout/Layout.vue'
import SignUp from '../views/pages/SignUp/Index.vue'
import User_Home from '../views/pages/acc/user/Index.vue'
import Support_Home from '../views/pages/acc/support/Index.vue'
import MainHome from '../views/pages/home/Index.vue'
import Admin_Home from '../views/pages/acc/admin/Index.vue'
Vue.use(VueRouter);
const routes = [
      {
        name: "login",
        path: "/login",
        component: SignIn
       
      },
      {
        name: "HOME",
        path: "/",
        component: MainHome
      },
      {
        name: "user_home",
        path: "/user_home",
        component: User_Home
      },
      {
        name: "admin_home",
        path: "/admin_home",
        component: Admin_Home
      },
      {
        name: "signup",
        path: "/Signup",
        component: SignUp
      },
      {
        path: "/tickets",
        name: "tickets",
        component: Ticket
      },
      {
        path: "/users",
        name: "users",
        component: Users
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
        path:"/support_home",
        name: "support_home",
        component: Support_Home
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
