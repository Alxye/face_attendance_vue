import { loginApi, getInfoApi, loginOutApi } from '@/api/user'
import { ActionContext } from 'vuex'

export interface userState {
  token: string,
  info: object
}
const state = (): userState => ({
  token: '', // 登录token
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state: userState) {
    return state.token
  }
}

// mutations
const mutations = {
  tokenChange(state: userState, token: string) {
    state.token = token
    var data2 = localStorage.getItem('userString');
    console.log(data2);
  },
  infoChange(state: userState, info: object) {
    state.info = info
  }
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      loginApi(params)
      .then(res => {
        localStorage.setItem('did', JSON.stringify(res.did))
        console.log(res);
        //localStorage.setItem('did', JSON.stringify(res.did))
        commit('tokenChange', res.token)
        // dispatch('getInfo', { token: res.data.token })
        // .then(infoRes => {
        //   resolve(res.data.token)
        // })
        resolve(res.token)
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
  logout({ commit,dispatch }: ActionContext<userState, userState>) {
    loginOutApi()
    .then(res => {
      localStorage.removeItem('did');
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
