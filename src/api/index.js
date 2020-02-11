import axios from 'axios'
import {getToken} from '@/utils/token.js'
const indexRequest = axios.create({
    baseURL:process.env.VUE_APP_URL,
    // ajax跨域请求不会携带cookie，需要人为设置
    withCredentials: true,
})
//用户信息接口
export function info() {
    return indexRequest({
        url: "/info",
        method: "get",
        headers:{
            token:getToken()
        }
    })
}
//退出登录接口
export function logout(){
    return indexRequest({
        url:"/logout",
        method:"get",
        headers:{
            token:getToken()
        }
    })
}