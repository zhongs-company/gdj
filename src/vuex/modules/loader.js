import * as types from '../types'

const state = {
   isShowLoader:false
}

const actions = {

}

const getters = {

}

const mutations = {
    [types.LOADER_SHOW](state) {
        state.isShowLoader = true;
    },
    [types.LOADER_HIDE](state) {
        state.isShowLoader = false;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
