import * as types from '../types'

const state = {
    isShow: false,
    value: ''
}

const actions = {

}

const getters = {

}

const mutations = {
    [types.MSG_POPUP_SHOW](state, res) {
        state.isShow = true;
        state.value = res.value;
        setTimeout(() => {
            state.isShow = false;
            state.value = '';
        }, res.time || 2000);
    },
    [types.MSG_POPUP_HIDE](state) {
        state.isShow = false;
        state.value = '';
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
