import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import TeacherView from "@/views/TeacherView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: "calendar",
          name: "calendar",
          meta:{
            isShow: true,
            father: 'home',
            title: "实习日历"
          },
          component: () => import('../views/CalendarView.vue'),
        },
        {
          path: "createIntern",
          name: "createIntern",
          meta:{
            isShow: true,
            father: 'home',
            title: "新建实习"
          },
          component: () => import('../views/CreateInternView.vue'),
        },
        {
          path: "checkSelfApplication",
          name: "checkSelfApplication",
          meta:{
            isShow: true,
            father: 'home',
            title: "查看申请"
          },
          component: () => import('../views/student/CheckApplication.vue'),
        },
        {
          path: "studentInformation",
          name: "studentInformation",
          meta:{
            isShow: true,
            father: 'home',
            title: "个人信息"
          },
          component: () => import('../views/student/StudentInformation.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherView,
      children: [
        {
          path: "checkApplication",
          name: "checkApplication",
          meta:{
            isShow: true,
            father: 'teacher',
            title: "审批申请"
          },
          component: () => import('../views/CheckApplication.vue'),
        },
        {
          path: "checkCalendar",
          name: "checkCalendar",
          meta:{
            isShow: true,
            father: 'teacher',
            title: "查看学生日历"
          },
          component: () => import('../views/CheckCalendarView.vue'),
        }
      ]
    }
  ]
})

export default router
