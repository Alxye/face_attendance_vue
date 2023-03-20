import { loginApi, getInfoApi, loginOutApi } from '@/api/user'
import {ActionContext, useStore} from 'vuex'

export interface userState {
  token: string,
  staff_id: string,
  info: object
}
const state = (): userState => ({
  token: '', // 登录token
  staff_id: '', // 员工id
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state: userState) {
    return state.token
  },
  id(state: userState) {
    return state.staff_id
  }
}

// mutations
const mutations = {
  tokenChange(state: userState, token: string) {
    state.token = token
  },
  idChange(state: userState, staff_id: string) {
    state.staff_id = staff_id
  },
  infoChange(state: userState, info: object) {
    state.info = info
  }
}

// actions
const actions = {
  // update user info
  update({ commit, dispatch }: ActionContext<userState, userState>, staff_id: any) {
    return new Promise((resolve, reject) => {
        // commit('infoChange', params)
        dispatch('getInfo', { staff_id: staff_id })
        resolve(staff_id)
    })
  },

  // login by login.vue
  login({ commit, dispatch }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      loginApi(params)
      .then(res => {
        commit('tokenChange', res.data.token)
        dispatch('getInfo', { staff_id: res.data.info.staff_id })
        .then(infoRes => {
          resolve(res.data.token)
        })
      }).catch(err => {
        console.log("catch err!!")
        reject(err)
      })
    })
  },
  // get user info after user logined
  getInfo({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      getInfoApi(params)
      .then(res => {
        commit('infoChange', res.data.info)
        resolve(res.data.info)
      })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit }: ActionContext<userState, userState>) {
    loginOutApi()
    .then(res => {

    })
    .catch(error => {

    })
    .finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      sessionStorage.removeItem('vuex')
      location.reload()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
