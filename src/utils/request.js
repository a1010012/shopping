import store from '@/store'//导入Vuex的store实例（状态管理）
import axios from 'axios'//导入axios库（用于发送HTTP请求）
import { Toast } from 'vant';
// import {getInfo} from '@/utils/storage'

// 创建 axios 实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的 axios 实例
const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',//基础请求路径
  timeout: 15000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //开启loading，禁止背景点击
  Toast.loading({
    message: '加载中...',
    forbidClick: true,//禁止背景点击
    duration: 0//不会自动消失
  });
  //只要有token,就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token//从Vuex的getters中获取token（登录状态标识）
  if (token) {
    //// 给请求头添加token和平台标识（供后端验证身份和区分客户端）
    config.headers['Access-token'] = token
    config.headers.platform = 'H5'
  }
  return config;//返回处理后的配置，继续发送请求
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data;
  console.log(res);
  if (res.status !== 200) {
    //给提示
    Toast(res.message)
    return Promise.reject(res.message)// 抛出错误，让接口调用方通过catch处理
  } else {
    Toast.clear()// 业务成功时，清除之前的加载动画
  }
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 导出配置好的实例
export default instance
