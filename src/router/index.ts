import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import TeacherView from "@/views/teacher/TeacherView.vue";
import CompanyView from "@/views/company/CompanyView.vue";
import ManagerView from "@/views/manager/ManagerView.vue";

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
          component: () => import('../views/student/CalendarView.vue'),
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
        },
        {
          path: "checkJobs",
          name: "checkJobs",
          meta:{
            isShow: true,
            father: 'home',
            title: "申请实习"
          },
          component: () => import('../views/student/CheckJobs.vue'),
        },
        {
          path: "createIntern",
          name: "createIntern",
          meta:{
            isShow: true,
            father: 'home',
            title: "新建实习"
          },
          component: () => import('../views/student/CreateInternView.vue'),
        },
        {
          path: "internshipSituation",
          name: "internshipSituation",
          meta:{
            isShow: true,
            father: 'home',
            title: "实习情况"
          },
          component: () => import('../views/student/CheckInternshipSituation.vue'),
        },
        {
          path: "interviewSituation",
          name: "interviewSituation",
          meta:{
            isShow: true,
            father: 'home',
            title: "面试情况"
          },
          component: () => import('../views/student/InterviewSituation.vue'),
        },
        {
          path: "editPassword",
          name: "editPassword",
          meta:{
            isShow: true,
            father: 'home',
            title: "修改密码"
          },
          component: () => import('../views/EditPassword.vue'),
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
        },
        {
          path: "dailyCollection",
          name: "dailyCollection",
          meta:{
            isShow: true,
            father: 'teacher',
            title: "日志系统"
          },
          component: () => import('../views/teacher/DailyCollection.vue'),
        },
        {
          path: "editTeacherPassword",
          name: "editTeacherPassword",
          meta:{
            isShow: true,
            father: 'teacher',
            title: "修改密码"
          },
          component: () => import('../views/EditPassword.vue'),
        }
      ]
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyView,
      children: [
        {
          path: "postJob",
          name: "postJob",
          meta:{
            isShow: true,
            father: 'company',
            title: "发布职位"
          },
          component: () => import('../views/company/PostJob.vue'),
        },
        {
          path: "checkApplicationSituation",
          name: "checkApplicationSituation",
          meta:{
            isShow: true,
            father: 'company',
            title: "查看职位申请情况"
          },
          component: () => import('../views/company/CheckApplicationSituation.vue'),
        },
        {
          path: "jobs",
          name: "jobs",
          meta:{
            isShow: true,
            father: 'company',
            title: "已发布职位"
          },
          component: () => import('../views/company/Jobs.vue'),
        },
        {
          path: "company_count",
          name: "company_count",
          meta:{
            isShow: true,
            father: 'company',
            title: "统计数据"
          },
          component: () => import('../views/company/CompanyCountView.vue'),
        },
        {
          path: "company_comment",
          name: "company_comment",
          meta:{
            isShow: true,
            father: 'company',
            title: "评价系统"
          },
          component: () => import('../views/company/CompanyComment.vue'),
        },
        {
          path: "editCompanyPassword",
          name: "editCompanyPassword",
          meta:{
            isShow: true,
            father: 'company',
            title: "修改密码"
          },
          component: () => import('../views/EditPassword.vue'),
        }
      ]
    },
    {
      path: '/manager',
      name: 'manager',
      component: ManagerView,
      children: [
        {
          path: "count",
          name: "count",
          meta:{
            isShow: true,
            father: 'manager',
            title: "查看统计数据"
          },
          component: () => import('../views/manager/CountView.vue'),
        },
        {
          path: "uploadStudentAccount",
          name: "uploadStudentAccount",
          meta:{
            isShow: true,
            father: 'manager',
            title: "导入账号"
          },
          component: () => import('../views/manager/UploadStudentAccount.vue'),
        },
        {
          path: "add_company",
          name: "add_company",
          meta:{
            isShow: true,
            father: 'manager',
            title: "添加公司"
          },
          component: () => import('../views/manager/AddCompany.vue'),
        },
        {
          path: "company_list",
          name: "company_list",
          meta:{
            isShow: true,
            father: 'manager',
            title: "公司列表"
          },
          component: () => import('../views/manager/CompanyList.vue'),
        },
        {
          path: "editManagerPassword",
          name: "editManagerPassword",
          meta:{
            isShow: true,
            father: 'manager',
            title: "修改密码"
          },
          component: () => import('../views/EditPassword.vue'),
        }
      ]
    }
  ]
})

export default router
