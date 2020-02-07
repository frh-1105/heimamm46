import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login/login.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    //路由规则
    routes:[
        {
            path:"/login",
            component:login
        }
    ]
})
export default router