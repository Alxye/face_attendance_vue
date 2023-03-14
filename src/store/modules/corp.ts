import {ActionContext} from 'vuex'
import {getInfoApi} from "@/api/user";
import {userState} from "@/store/modules/user";
import {getStaffDistribution} from "@/api/corporation";

export interface corpState {
    info: object
}

const state = (): corpState => ({
    info: {}
})

// getters
const getters = {
    info(state: corpState) {
        return state.info
    }
}

// mutations
const mutations = {
    InfoChange(state: corpState, info: object) {
        state.info = info
    }
}

// actions
const actions = {
    SaveInfo({commit, dispatch}: ActionContext<corpState, corpState>, params: any) {
        return new Promise((resolve, reject) => {
            commit('InfoChange', params)
            resolve(params)
        })
    }

    // // get user info after user logined
    // getInfo({commit}: ActionContext<userState, userState>, params: any) {
    //     return new Promise((resolve, reject) => {
    //         getInfoApi(params)
    //             .then(res => {
    //                 commit('infoChange', res.data.info)
    //                 resolve(res.data.info)
    //             })
    //     })
    // },
    //
    // // login out the system after user click the loginOut button
    // loginOut({commit}: ActionContext<userState, userState>) {
    //     loginOutApi()
    //         .then(res => {
    //
    //         })
    //         .catch(error => {
    //
    //         })
    //         .finally(() => {
    //             localStorage.removeItem('tabs')
    //             localStorage.removeItem('vuex')
    //             sessionStorage.removeItem('vuex')
    //             location.reload()
    //         })
    // }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
