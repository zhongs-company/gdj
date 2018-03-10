import * as types from '../types'
import * as config from '@/lib/config'
import * as api from '../api'
const state = {
    voteActivity: {},
    voteActivityCatList: [],
    currentCatId: '',
    list: [],
    total: 1,
    page: 1,

    voteActivityObject: {},
    myVoteCountToday: 0
}

const actions = {
    pxhd_init({ commit, state }, req) {
        api.pxhd_init({
            success: (res) => {
                if (res.ret == 0) {
                    commit(types.PXHD_INIT, res);
                    req.success && req.success();
                }
            }
        });
    },

    pxhd_voteActivityObject({ commit, state }, req) {
        if (!req) {
            var { voteActivityCatList } = state;
            // console.log(state)
            var req = {
                catId: voteActivityCatList[0].catId,
                pageNo: 1,
                objectTitle: '',
                objectCode: ''
            }
            commit('PXHD_GET_CATID', voteActivityCatList[0].catId);
        }

        api.pxhd_voteActivityObject({
            catId: state.currentCatId,
            pageNo: req.pageNo,
            objectTitle: req.objectTitle,
            objectCode: req.objectCode,
            success: (res) => {
                if (res.ret != 0) { return };
                commit(types.PXHD_GET_LIST, res);

                req.success && req.success();
            }
        })
    },

    pxhd_voteActivityObject_detail({ commit, state }, req) {
        api.pxhd_voteActivityObject_detail({
            objectId: req.objectId,
            success: (res) => {
                if (res.ret == 0) {
                    // var { voteActivityObject } = res.data;
                    commit(types.PXHD_GET_DETAIL, res.data);
                }
            }
        })
    },

    pxhd_voteActivityLog({ commit, state }, req) {
        // var { index } = req;
        api.pxhd_voteActivityLog({
            objectId: req.objectId,
            activityId: req.activityId,
            success: (res) => {
                // res.index = index;
                commit(types.PXHD_LIST_ZAN, res);
            }
        })
    },

    pxhd_seach({ commit, state }, req) {
        api.pxhd_seach({
            keyword: req.keyword,
            success: (res) => {
                commit(types.PXHD_SEACH_LIST, res);
                req.success(res);
            }
        });
    }
}

const getters = {

}

const mutations = {
    [types.PXHD_INIT](state, res) {
        var { voteActivity, voteActivityCatList } = res.data;
        voteActivity.coverImage = `${config.cdn_img_src}${voteActivity.coverImage}`
        state.voteActivity = voteActivity;


        if (voteActivityCatList.length != 0) {
            voteActivityCatList.forEach((item, index) => {
                item.isClick = false;
                if (index == 0) {
                    item.isClick = true;
                }
            });
            state.voteActivityCatList = voteActivityCatList
        }

    },
    [types.PXHD_TABS](state, index) {
        var { voteActivityCatList } = state;
        voteActivityCatList.forEach((item, ind) => {
            if (index == ind) {
                item.isClick = true;
            } else {
                item.isClick = false;
            }
        })
    },
    [types.PXHD_GET_LIST](state, res) {
        var { list, page, total } = res.data;
        list = list.map((item) => {
            return {
                coverImage: `${config.cdn_img_src}${item.coverImage}`,
                objectTitle: item.objectTitle,
                objectSummary: item.objectSummary,
                voteCount: item.voteCount,
                publisher: item.publisher,
                belongId: item.belongId,
                activityId: item.activityId,
                objectId: item.objectId
            }
        });

        list.forEach((item) => {
            state.list.push(item)
        });

        state.list = list;
        state.page += 1;
        state.total = total;
    },
    [types.PXHD_LIST_ZAN](state, res) {
        // state.page = 1;
        // state.list[res.index].voteCount += 1;
        state.myVoteCountToday = -1;
        alert('今日投票成功！');
    },
    [types.PXHD_GET_CATID](state, catId) {
        state.currentCatId = catId;
    },

    //搜索
    [types.PXHD_SEACH_LIST](state, res) {
        var { list, page, total } = res.data;

        if (list && list.length > 0) {
            list = list.map((item) => {
                return {
                    coverImage: `${config.cdn_img_src}${item.coverImage}`,
                    objectTitle: item.objectTitle,
                    objectSummary: item.objectSummary,
                    voteCount: item.voteCount,
                    belongId: item.belongId,
                    activityId: item.activityId,
                    objectId: item.objectId
                }
            });
            state.list = list;
        }

        state.page == 1;
        state.total = total;
    },

    [types.PXHD_GET_DETAIL](state, data) {
        var { voteActivityObject, myVoteCountToday } = data;
        state.voteActivityObject = voteActivityObject;
        state.myVoteCountToday = myVoteCountToday;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
