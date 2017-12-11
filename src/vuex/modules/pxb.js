import * as types from '../types'
import * as api from '../api'
import * as config from '@/lib/config'
import * as utils from '@/lib/utils'

const state = {
    list: [],
    total:0,
    page:0
}

const actions = {
    pxb_getList({ commit, state }, req) {
        api.elnClass(req, (res) => {
        	commit(types.PXB_GET_LIST, res);
        	req.cb && req.cb();
        });
    },
    pxb_getDetail({commit, state}, req){
        api.elnClassDetail(req, (res)=>{
            commit(types.PXB_GET_DETIAL, res);
            req.cb && req.cb();
        })
    },
    pxb_getTopicList({commit, state}, req){
        api.elnClassTopicList(req, (res)=>{
            commit(types.PXB_GET_TOPIC_LIST, res);
        });
    }
}

const getters = {

}

const mutations = {
   [types.PXB_GET_LIST](state, res) {
   		var { list, total, page } = res;
        var list = list.map((item)=>{
            return {
                classId:item.classId,
                classLogo: `${config.cdn_img_src}${item.classLogo}`,
                className: item.className,
                createTime: utils.setDate(item.createTime),
                memo: item.memo
            }
        });

        list.forEach((item)=>{
        	state.list.push(item)
        });

        state.total = total;
        state.page = page;
       
    },
    [types.PXB_RESET](state){
    	state.list.length = 0;
    	state.total = 0;
    	state.page = 0;
    },
    [types.PXB_GET_DETIAL](state, res){

    },
    [types.PXB_GET_TOPIC_LIST](state, res){

    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
