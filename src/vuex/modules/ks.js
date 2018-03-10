import * as types from '../types'
import * as api from '../api'
import * as utils from '@/lib/utils'

const state = {
    showBut: false,
    showPre: false,
    showNext: true,
    list: [],
    examTitle: '',
    examDesc: '',
    allowCount: '',
    examItemList: [],
    currentExamItem: {
        itemType: ''
    },
    currentIndex: 0,
    examId: '',
    paperId: '',
    detailId: '',
    signleValue: '',
    multiValue: '',
    judgeValue: '',
    shownextBtn: false,
    showsubmitBtn: false,
    over: false,
    passScore: 0,
    showPassScorePopup: false,
    passScore1: 0,
    totalScore: 0,
    phase: '',
    duration: 0,
    startTime: 0,
    endTime: 0,
    examUserDetailList: [],
    score: 0,
    detailId1: '',
    allAnswer: null
}

const actions = {
    ks_getMyCanExamAll({ commit, state }, req) {
        api.ks_getMyCanExamAll(req, (res) => {
            commit(types.KS_GET_LIST, res);
        });
    },
    ks_getDetail({ commit, state }, req) {
        api.ks_getDetail({
            examId: req.examId,
            success: (res) => {
                commit(types.KS_GET_DETAIL, res);
            }
        });
    },
    ks_getwtlist({ commit, state }, req) {
        commit('LOADER_SHOW');

        api.ks_beginExam({
            examId: req.examId,
            success: (res) => {
                commit('LOADER_HIDE');

                if (res.ret == 0) {
                    var { hasExamChance, err_msg } = res.data;
                    if (hasExamChance == 'N') {
                        alert(err_msg);
                        return;
                    }
                    commit(types.KS_GET_WTLIST, res);
                    //commit(types.KS_CURRENT_ITEM, 0);
                }
                if (res.ret == -1) {
                    alert(ret.msg);
                    return;
                }
            }
        });
    },
    ks_saveItemAnswer({ commit, state }, req) {
        // commit(types.KS_CURRENT_ITEM, state.currentIndex);
        commit('LOADER_SHOW');

        api.ks_saveItemAnswer({
            itemId: req.itemId,
            detailId: req.detailId,
            answer: req.answer,
            success: () => {
                commit('LOADER_HIDE');

                // 下一题
            }
        })
    },
    ks_completeExam({ commit, state }, req) {
        commit('LOADER_SHOW');
        api.ks_completeExam({
            paperId: state.paperId,
            detailId: state.detailId,
            examId: state.examId,
            success: (res) => {
                commit('LOADER_HIDE');
                if (res.ret == 0) {
                    var { examUserDetail } = res.data;

                    commit(types.KS_PASSSCORE, examUserDetail);
                }
            }
        });
    },

    ks_allAnswer({ commit, state }, req) {
        api.ks_allAnswer({
            detailId: req.detailId,
            success: (res) => {
                commit(types.ALLANSWER, res)
            }
        })
    }
}

const getters = {

}

const mutations = {
    [types.KS_GET_LIST](state, res) {
        var { data } = res;
        var list = data.list.map((item) => {
            return {
                examId: item.examId,
                examDesc: item.examDesc,
                examTitle: item.examTitle,
                phase: item.phase,
                createTime: utils.setDate(item.createTime),
                endTime: utils.setDate(item.endTime)
            }
        });

        state.list = list;
    },
    [types.KS_GET_DETAIL](state, res) {
        var { examInfo, examUserDetailList } = res.data;
        var { examTitle, examDesc, allowCount, examId, paperId, duration, passScore, totalScore, startTime, endTime, phase } = examInfo;
        state.paperId = paperId;
        state.examId = examId;
        state.examTitle = examTitle;
        state.examDesc = examDesc;
        state.allowCount = allowCount;
        state.duration = duration;
        state.passScore1 = passScore;
        state.totalScore = totalScore;
        state.phase = phase;



        state.startTime = utils.setDate(startTime);
        state.endTime = utils.setDate(endTime);

        if (state.endTim > state.startTime) {
            state.endTime = '本次考试时间已结束，不能作答哦！';
        }

        if (examUserDetailList.length != 0) {
            examUserDetailList = examUserDetailList.map((item) => {
                return {
                    endTime: utils.setDate(item.endTime),
                    score: item.score,
                    detailId: item.detailId
                }
            })
        }
        state.examUserDetailList = examUserDetailList;

    },
    [types.KS_GET_WTLIST](state, res) {
        if (res.ret != 0) {
            return;
        }
        var { examItemList, examUserDetail } = res.data;

        //单选，多选加字段
        examItemList.forEach((item) => {
            if (item.itemType == 'signle') {
                item.optionList.forEach((li) => {
                    li.isSelect = false;
                })
            }

            if (item.itemType == 'multi') {
                item.optionList.forEach((li) => {
                    li.isSelect = false;
                })
            }

            if (item.itemType == 'judge') {
                item.optionList.forEach((li) => {
                    li.isSelect = false;
                })
            }

            if (item.itemType == 'ask' || item.itemType == 'blank') {
                item.input = '';
            }

        });


        state.examItemList = examItemList;
        state.detailId = examUserDetail.detailId;
    },
    [types.KS_CURRENT_ITEM](state, index) {
        var { examItemList, currentIndex } = state;
        if (examItemList[index]) {
            state.currentExamItem = examItemList[index];
            state.currentIndex = currentIndex += 1;

            state.over = false;
            state.shownextBtn = true;
            state.showsubmitBtn = false;
        } else {
            console.log('题目答完了！');

            state.over = true;
            state.shownextBtn = false;
            state.showsubmitBtn = true;
        }
    },
    [types.KS_SIGNLE](state, index) {
        // var { currentExamItem } = state;
        // var { optionList } = currentExamItem;
        // optionList.forEach((item, ind) => {
        //     if (index == ind) {
        //         state.signleValue = item.option;
        //         item.isSelect = true;
        //     } else {
        //         item.isSelect = false;
        //     }
        // });
        // state.currentExamItem.optionList = currentExamItem.optionList;

        var { examItemList, currentIndex } = state;
        var { optionList } = examItemList[currentIndex];
        optionList.forEach((item, ind) => {
            if (index == ind) {
                state.signleValue = ind;
                item.isSelect = true;
            } else {
                item.isSelect = false;
            }
        });

        state.examItemList[currentIndex].optionList = optionList;

    },
    [types.KS_JUDEG](state, index) {
        // var { currentExamItem } = state;
        // var { optionList } = currentExamItem;
        // optionList.forEach((item, ind) => {
        //     if (index == ind) {
        //         state.judgeValue = utils.abc(ind);
        //         item.isSelect = true;
        //     } else {
        //         item.isSelect = false;
        //     }
        // });
        // state.currentExamItem.optionList = currentExamItem.optionList;

        var { examItemList, currentIndex } = state;
        var { optionList } = examItemList[currentIndex];
        optionList.forEach((item, ind) => {
            if (index == ind) {
                //state.judgeValue = utils.abc(ind);
                item.isSelect = true;
            } else {
                item.isSelect = false;
            }
        });
        state.examItemList[currentIndex].optionList = optionList;
    },
    [types.KS_RESET_VALUE](state) {
        state.signleValue = '';
        state.multiValue = '';

    },
    [types.KS_MULTI](state, index) {
        // var { currentExamItem } = state;
        // var { optionList } = currentExamItem;
        // if (optionList[index].isSelect) {
        //     optionList[index].isSelect = false;
        // } else {
        //     optionList[index].isSelect = true;
        // }
        // state.currentExamItem.optionList = currentExamItem.optionList;


        var { examItemList, currentIndex } = state;
        var { optionList } = examItemList[currentIndex];
        if (optionList[index].isSelect) {
            optionList[index].isSelect = false;
        } else {
            optionList[index].isSelect = true;
        }
        state.examItemList[currentIndex].optionList = optionList;


    },

    // 拼接多选题的答案
    // [types.KS_GET_MULTI](state) {
    //     var { examItemList,currentIndex, multiValue } = state;
    //     examItemList[currentIndex].optionList.forEach((item, index) => {
    //         if (item.isSelect) {
    //             multiValue += utils.abc(index);
    //         }
    //     });
    //     state.multiValue = multiValue;
    // },
    [types.KS_PASSSCORE](state, res) {
        var { passScore, score, detailId } = res;
        state.showPassScorePopup = true;
        state.passScore = passScore;
        state.score = score;
        state.detailId1 = detailId;
    },
    [types.ALLANSWER](state, res) {
        var { examItemList } = res.data;
        var arr = [];

        var fun = (option, arr) => {
            var isSelect = false;
            arr.forEach((l) => {
                if (l == utils.abc(option)) {
                    isSelect = true;
                }
            });

            return isSelect;
        }

        examItemList.forEach((item) => {

            if (item.itemType == 'signle') {
                item.optionList.forEach((ele, index) => {
                    if (fun(index, [item.userAnswer])) {
                        ele.isSelect = true;
                    }
                });
            }

            if (item.itemType == 'multi') {
                arr = item.userAnswer.split('')

                item.optionList.forEach((ele, index) => {
                    if (fun(index, arr)) {
                        ele.isSelect = true;
                    }
                });
            }


            if (item.itemType == 'judge') {
                item.optionList.forEach((ele, index) => {
                    if (fun(index, [item.userAnswer])) {
                        ele.isSelect = true;
                    }
                });
            }


        })


        state.allAnswer = examItemList

    },
    [types.KS_RESET_POPUP](state) {
        state.showPassScorePopup = false;
    },
    [types.KS_RESET_DATA](state) {
        state.currentIndex = 0;

        
        //答题按钮
        state.showBut = false;
        state.showPre = false;
        state.showNext = true;
    },

    [types.KS_PRE](state) {
        state.currentIndex -= 1;

        if (state.currentIndex < state.examItemList.length - 1) {
            state.showBut = false;
            state.showPre = true;
            state.showNext = true;
        }

        if (state.currentIndex <= 0) {
            state.currentIndex = 0
            state.showBut = false;
            state.showPre = false;
            state.showNext = true;
        }

    },

    [types.KS_NEXT](state) {
        state.currentIndex += 1;
        if (state.currentIndex >= state.examItemList.length - 1) {
            state.currentIndex = state.examItemList.length - 1;
            state.showBut = true;
            state.showPre = true;
            state.showNext = false;
        } else {
            state.showPre = true;
        }

    },

    [types.KS_HIDE_BTN](state) {
        state.showBut = false;
        state.showPre = false;
        state.showNext = false;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
