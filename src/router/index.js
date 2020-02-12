import Vue from 'vue'
import VueRouter from 'vue-router'
//导入 路由组件
import login from '../view/login/login.vue'
import index from '@/view/index/index.vue'
//导入 嵌套路由组件
import chart from '@/view/index/chart/chart.vue'
import enterprise from '@/view/index/enterprise/enterprise.vue'
import question from '@/view/index/question/question.vue'
import subject from '@/view/index/subject/subject.vue'
import user from '@/view/index/user/user.vue'

//导入进度条组件
import NProgress from 'nprogress'
//导入进度条样式
import 'nprogress/nprogress.css'

Vue.use(VueRouter)
const router = new VueRouter({
    //路由规则
    routes:[
        {
            path:"/login",
            component:login
        },
        {
            path:"/index",
            component:index,
            children:[
                {
                    path:"chart",
                    component:chart
                },
                {
                    path:"enterprise",
                    component:enterprise
                },
                {
                    path:"question",
                    component:question
                },
                {
                    path:"subject",
                    component:subject
                },
                {
                    path:"user",
                    component:user
                },
            ]
        }
    ]
})
//导航守卫  （前置守卫，回调函数）
router.beforeEach((to,form,next)=>{
    //开启进度条
    NProgress.start()
    //向后走
    next()
})
//导航守卫  （后置守卫，回调函数）
// router.afterEach((to,form)=>{
router.afterEach(()=>{
    //关闭进度条
    NProgress.done()
})
export default router