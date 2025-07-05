import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      //这里的包括蓝色背景与白色底色
      path: "/",
      component: () => import("../Show.vue"),
      children: [
        {
          path: "login",
          component: () => import("../login/LoginMain.vue"),
          name: "login",
        },
        {
          path: ":id/lessonPlan/editLessonPlan",
          component: () => import("../lesson_plan/EditLessonPlan.vue"),
          name: "editLessonPlan",
        },
        {
          path: ":id/lessonPlan/showTeachingProgram/:tpid",
          component: () =>
            import("../teaching_program/ShowTeachingProgram.vue"),
          name: "showTeachingProgram",
        },
      ],
    },
    {
      //这里所有内容包括侧边导航栏
      path: "/",
      component: () => import("../Home.vue"),
      children: [
        {
          path: ":id/home",
          component: () => import("../home/HomeMain.vue"),
          name: "homeMain",
        },
        {
          path: ":id/teachingProgram",
          component: () =>
            import("../teaching_program/TeachingProgramMain.vue"),
          name: "teachingProgram",
        },
        {
          path: ":id/lessonPlan",
          component: () => import("../lesson_plan/LessonPlanMain.vue"),
          name: "lessonPlan",
        },
        {
          path: ":id/lessonPrepareDocx",
          component: () => import("../lesson_prepare/LessonPrepareDocx.vue"),
          name: "lessonPrepareDocx",
        },
        {
          path: ":id/lessonPreparePPT",
          component: () => import("../lesson_prepare/LessonPreparePPT.vue"),
          name: "lessonPreparePPT",
        },
      ],
    },
    
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/login');
  } else {
    next();
  }
});
export default router;
