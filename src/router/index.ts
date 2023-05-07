import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import TeacherView from "@/views/TeacherView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'student',
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
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
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
        },
        {
          path: "teacherInformation",
          name: "teacherInformation",
          meta:{
            isShow: true,
            father: 'teacher',
            title: "个人信息及学生信息"
          },
          component: () => import('../views/teacher/TeacherInformation.vue'),
        },
        {
          path: "edit",
          name: "editTeacherInformation",
          meta:{
            isShow: false,
            father: 'teacher',
            title: "编辑"
          },
          component: () => import('../views/teacher/EditTeacherInformation.vue'),
        }
      ]
    }
  ]
})

export default router
