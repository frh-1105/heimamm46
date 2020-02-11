import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login/login.vue'
import index from '@/view/index/index.vue'
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
            component:index
        }
    ]
})
export default router