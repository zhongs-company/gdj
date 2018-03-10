import * as types from '../types'
import * as api from '../api'
import * as config from '@/lib/config'
import * as utils from '@/lib/utils'

const state = {
    list: [],
    total: 0,
    page: 0,
    groupId: 0,
    //培训班详情-分页
    groupPageNo: 1,
    groupPageTotal: 1,
    topicList: [],

    classPhase: '',
    isApplyed: '',
    classLogo: '',
    className: '',
    address: '',
    beginTime:'',

    memo: '',
    classDesc: '',

    voteSubjectList: [],
    voteInfo: {
        voteTitle: ''
    },


    centerList:[]

}

const actions = {
    pxb_getList({ commit, state }, req) {
        api.elnClass(req, (res) => {
            commit(types.PXB_GET_LIST, res);
            req.cb && req.cb();
        });
    },
    pxb_getDetail({ commit, state }, req) {
        api.elnClassDetail(req, (res) => {
            commit(types.PXB_GET_DETIAL, res);
            req.cb && req.cb();
        })
    },
    pxb_getTopicList({ commit, state }, req) {
        api.elnClassTopicList(req, (res) => {
            commit(types.PXB_GET_TOPIC_LIST, res);
            req.cb && req.cb();
        });
    },
    pxb_pushTopic({ commit, state }, req) {
        api.elnClassPushTopic(req, (res) => {
            req.cb && req.cb(res);
        })
    },
    pxb_pxpg_list({ commit, state }, req) {
        api.elnClassPxpg(req, (res) => {
            commit(types.PXB_PXPB_LIST, res);
        });
    },
    pxb_pxpg_sub({commit, state}, req){

        commit(types.PXB_PXPB_SUB);

        api.elnClassvoteInfo({
            voteId: state.voteInfo.voteId,
            userAnswerJson:JSON.stringify({ voteSubjectList:state.voteSubjectList })
        }, (res)=>{
            req.cb && req.cb(res)
        });
    },
    //个人中心-我的课堂
    center_getMyClassPage({commit, state}, req){
        api.center_getMyClassPage({
            success:(res)=>{
                commit(types.CENTER_MY_CLASS_LIST, res);
            }
        })
    }

}

const getters = {

}

const mutations = {
    [types.PXB_GET_LIST](state, res) {
        var { list, total, page } = res;
        var list = list.map((item) => {
            return {
                classPhase: item.classPhase,
                classId: item.classId,
                classLogo: `${config.cdn_img_src}${item.classLogo}`,
                className: item.className,
                createTime: utils.setDate(item.createTime),
                memo: item.memo
            }
        });

        list.forEach((item) => {
            state.list.push(item)
        });

        state.total = total;
        state.page = page;

    },
    [types.PXB_RESET](state) {
        state.list.length = 0;
        state.total = 0;
        state.page = 0;
    },
    [types.PXB_GET_DETIAL](state, res) {
        //classPhase : evaluate 培训评估，
        //classPhase : training 培训中

        var {
            memo,
            classDesc,
            classPhase,
            className,
            classLogo,
            groupId,
            address,
            beginTime
        } = res.elnClass;

        //是否培训报名
        var { isApplyed } = res;

        // var {} = res.masterTeacher;

        state.classLogo = config.cdn_img_src + classLogo;
        state.className = className;
        state.address = address;
        state.beginTime = utils.setDate(beginTime);
        //注意事项
        state.memo = memo;
        //课程介绍
        state.classDesc = classDesc;

        state.groupId = groupId;
        state.classPhase = classPhase;
        state.isApplyed = isApplyed;

    },
    [types.PXB_GET_TOPIC_LIST](state, res) {
        var { list, page, total } = res;

        list = list.map((item) => {
            return {
                content: item.content,
                nickname: item.nickname || '匿名',
                headimgurl: item.headimgurl || 'http://1251097942.cdn.myqcloud.com/1251097942/demos/photo/photo2.jpg'
            }
        })

        list.forEach((item) => {
            state.topicList.push(item);
        });

        state.groupPageNo += 1;
        state.groupPageTotal = total;

    },
    [types.PXB_RESET_TOPIC_LIST](state) {
        state.topicList.length = 0;
        state.groupPageNo = 1;
        state.groupPageTotal = 1;
    },
    [types.PXB_PUSH_TOPIC_LIST](state, res) {
        var { content, headimgurl, nickname } = res.forumTopic;
        state.topicList.unshift({ content, headimgurl, nickname })
    },
    [types.PXB_PXPB_LIST](state, res) {
        var { voteInfo, voteSubjectList } = res.data;

        state.voteInfo = voteInfo;
        state.voteSubjectList = voteSubjectList;

    },
    //单选
    //index 是那道题
    //i 哪个选项
    [types.PXB_PXPB_SIGNLE](state, obj) {
        var { index, i } = obj;

        state.voteSubjectList[index].itemList.forEach((item) => {
            item.isSelected = 'N'
        });

        state.voteSubjectList[index].itemList[i].isSelected = 'Y';

        state.voteSubjectList[index].voteSubject.isAnswered = 'Y';
    },
    [types.PXB_PXPB_MUTIS](state, obj) {
        var { index, i } = obj;

        var { isSelected } = state.voteSubjectList[index].itemList[i];

        if (isSelected == 'N') {
            state.voteSubjectList[index].itemList[i].isSelected = 'Y'
        } else {
            state.voteSubjectList[index].itemList[i].isSelected = 'N'
        }

        state.voteSubjectList[index].voteSubject.isAnswered = 'Y';
    },
    [types.PXB_PXPB_ORDER](state, obj){

    },
    [types.PXB_PXPB_SUB](state){

        state.voteSubjectList.forEach((item)=>{
            var type = item.voteSubject.subjectType;
            if(type != 'signle' || type != 'multi'){
                if((item.voteSubject.answerContent).trim() != ''){
                    item.voteSubject.isAnswered = 'Y'
                }
            }
        })
    },

    //个人中心-我的课堂
    [types.CENTER_MY_CLASS_LIST](state, res){
        if(res.data && res.data.list){
            state.centerList = res.data.list;
        }
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
