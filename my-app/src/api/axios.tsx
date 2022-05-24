import axios from "axios";

const instance = axios.create({
    baseURL:'http://127.0.0.1:8000',
    headers:{
        'Content-type':'application/json',
    },
    withCredentials:true,
})

instance.interceptors.request.use(function(config:any){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

export default instance