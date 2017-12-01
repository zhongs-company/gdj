import * as api from '../api'
import * as types from '../types'

const state = {
    tabs:[]
}

const actions = {
    // 获取tabs
    getSysType({commit, state}, cb){
        api.sysType({}, (res)=>{
            commit(types.YFDT_GET_TABS, res);
            cb && cb();
        })
    }
}

const getters = {

}

const mutations = {
    [types.YFDT_GET_TABS](state, res) {

        var tabs = res.map((item)=>{
            return {
                typeId: item.typeId,
                typeName: item.typeName
            }
        });

        state.tabs = tabs;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
