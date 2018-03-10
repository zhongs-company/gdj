import * as types from '../types'
import * as api from '../api'
import * as config from '@/lib/config.js'

const state = {
    voteSubjectList: [],
    list: [],
    page: 1,
    total: 1,
    isSub: true
}

const actions = {
    pxxq_voteInfo({ commit, state }) {
        api.pxxq_voteInfo({
            success: (res) => {
                commit(types.PXXQ_GET_LIST, res);
            }
        });
    },
    pxxq_voteInfo_getDetail({ commit, state }, req) {
        api.pxxq_voteInfo_getDetail({
            voteId: req.voteId,
            success: (res) => {
                commit(types.PXXQ_GET_LIST_DETAIL, res);
            }
        });
    },
    pxxq_voteInfo_saveUserAnswer({ commit, state }, req) {
        var { voteSubjectList } = state;
        var userAnswerJson = { voteSubjectList };
        api.pxxq_voteInfo_saveUserAnswer({
            voteId: req.voteId,
            userAnswerJson: JSON.stringify(userAnswerJson),
            success: (res) => {
                req.success && req.success(res);
            }
        });
    }
}

const getters = {

}

const mutations = {
    [types.PXXQ_GET_LIST](state, res) {
        var { list, page, total } = res.data;
        if (!list) return;
        if (list.length == 0) return;

        list = list.map((item) => {
            return {
                coverImg: `${config.cdn_img_src}${item.coverImg}`,
                voteTitle: item.voteTitle,
                voteId: item.voteId,
                isVoted: item.isVoted
            }
        });

        list.forEach((item) => { state.list.push(item) });
        state.page = page;
        state.total = total;

    },
    [types.PXXQ_GET_LIST_DETAIL](state, res) {
        var { voteSubjectList } = res.data;
        state.voteSubjectList = voteSubjectList;
    },

    // 单选题
    [types.PXXQ_SIGNLE](state, indexObj) {
        var { voteSubjectList } = state;
        var { index, ind } = indexObj;

        voteSubjectList[index].itemList.forEach((item) => {
            item.isSelected = 'N'
        });

        voteSubjectList[index].itemList[ind].isSelected = 'Y'

        voteSubjectList[index].voteSubject.isAnswered = 'Y'
    },

    //多选题
    [types.PXXQ_MULTI](state, indexObj) {
        var { voteSubjectList } = state;
        var { index, ind } = indexObj;
        voteSubjectList[index].voteSubject.isAnswered = 'N'

        voteSubjectList[index].itemList.forEach((item, i) => {


            if (i == ind) {
                if (item.isSelected == 'N') {
                    item.isSelected = 'Y'
                } else {
                    item.isSelected = 'N'
                }
            }

            if (item.isSelected == 'Y') {
                voteSubjectList[index].voteSubject.isAnswered = 'Y'
            }

        });


    },
    [types.PXXQ_SUB](state) {
        var { voteSubjectList } = state;
        state.isSub = true;

        voteSubjectList.forEach((item) => {

            if (item.voteSubject.subjectType == 'ask') {
                if (item.voteSubject.answerContent) {
                    item.voteSubject.isAnswered = 'Y'
                }else{
                    item.voteSubject.isAnswered = 'N'
                }
            }

            //答题验证，必须答完才能提交；
            if (item.voteSubject.isAnswered != 'Y') {
                state.isSub = false;
                return;
            }

        });

    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
