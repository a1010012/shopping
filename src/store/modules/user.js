import { getInfo, setInfo, removeInfo } from "@/utils/storage"
//实现 状态的模块化隔离
//放登录权证信息
export default {
    // 开启了命名空间，确保模块内的 mutations/ actions / getters 不会与其他模块或根状态冲突。
    namespaced: true,
    state() {
        //提供数据
        // 定义模块内的 局部状态（仅当前模块可直接访问，其他模块需通过 rootState 间接访问）。
        return {
            userInfo: getInfo()
        }
    },
    mutations: {
        //提供修改数据的方法的
        // 定义修改模块内状态的 同步方法（Vuex 规定，所有状态修改必须通过 mutations，便于追踪状态变更）。
        setUserInfo(state, obj) {
            state.userInfo = obj
            setInfo(obj)
        },
        // 清除用户信息（退出登录时调用）
        clearUserInfo(state) {
            state.userInfo = { token: '', userId: '' }
            removeInfo() // 同步清除 localStorage
        }
    },
    actions: {
        //提供异步操作的
        // 定义处理 异步逻辑 的方法（如 API 请求、定时器），最终通过提交 mutations 修改状态。
    },
    getters: {
        //提供基于state出来的派生属性
        // 定义 计算属性，用于派生模块内的状态（类似组件的 computed，缓存结果，依赖变化时自动更新）。
        token(state) {
            return state.userInfo.token // ✅ 正确路径：从 userInfo 中获取 token
        },
        userId(state) {
            return state.userInfo.userId
        }
    }
}