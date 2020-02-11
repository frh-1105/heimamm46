import axios from 'axios'
const loginRequest = axios.create({
    baseURL:process.env.VUE_APP_URL,
    // ajax跨域请求不会携带cookie，需要人为设置
    withCredentials: true,
})
//用户登录接口
export function login(data) {
    return loginRequest({
        url: "/login",
        method: "post",
        data,
    })
}