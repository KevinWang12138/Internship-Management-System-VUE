import axios from 'axios'
//创建axios实例
const service = axios.create({
    baseURL:"http://localhost:8080",//todo 后续改成服务器ip/nginx反向代理
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})
//请求拦截，携带token
service.interceptors.request.use((config)=>{
    config.headers = config.headers || {}
    if(localStorage.getItem("token")){
        config.headers.token=localStorage.getItem("token") || ""
        console.log(config.headers)
    }
    return config
})
//响应拦截
service.interceptors.response.use((res)=>{
    const code:number = res.data.errNo
    if(code!=0){
        return Promise.reject(res.data)
    }
    return res.data
},(err)=>{
    console.log(err)
})
export default service