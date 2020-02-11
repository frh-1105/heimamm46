import axios from 'axios'
//暴露的 短信发送
export function sendsms(data) {
    return axios({
        url: process.env.VUE_APP_URL+"/sendsms",
        method: "post",
        data,
        // ajax跨域请求不会携带cookie，需要人为设置
        withCredentials: true,
    })
}
//用户注册接口
export function register(data) {
    return axios({
        url: process.env.VUE_APP_URL+"/register",
        method: "post",
        data,
        // ajax跨域请求不会携带cookie，需要人为设置
        withCredentials: true,
    })
}