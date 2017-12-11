import * as api from '../api'
import * as types from '../types'
import * as config from "@/lib/config";


const state = {
    list: [],
    page: 0,
    total: 0,
    isPull: true,
    classTab: [],
    detail:{
        elnCourse:{},
        commonAttachmentList:{},
        elnTeacher:{
            teacherDesc:''
        }
    }
}

const actions = {
    // 获取列表数据
    getElnCourse({ commit, state }, req) {
        commit(types.YXKCK_GET_LIST_NOPULL);
        api.elnCourse( req , (res) => {
            commit(types.YXKCK_GET_LIST, res);
            commit(types.YXKCK_GET_LIST_PULL);
            commit(types.LOADER_HIDE);
            req.cb && req.cb();
        })
    },
    //获取分类tab
    yxkck_getSysType({ commit, state }) {
        api.sysType({
            m: 'getTypeTree',
            type: 'course_type'
        }, (res) => {
            commit(types.YXKCK_GET_CLASSTAL, res);
        });
    },
    yxkck_getDetail({ commit, state }, req){
        api.elnCourseNew(req, (res)=>{
            commit(types.YXKCK_GET_DETAIL, res);
            commit(types.LOADER_HIDE);
        })
    },
    yxkck_zan({ commit, state }, courseId){
        api.elnCourseThumb({
            m:"saveThumbCourse",
            courseId
        }, (res)=>{
            if(res.ret == 0){
                commit(types.MSG_POPUP_SHOW, {value:'点赞成功！'});
                commit(types.YXKCK_UPDATE_ZAN, courseId);
                return;
            }

            if(res.err_code == 4){
                commit(types.MSG_POPUP_SHOW, {value:'您已经点赞了！'});
            }
        });
    }
}

const getters = {

}

const mutations = {
    [types.YXKCK_GET_LIST](state, res) {

        var { list, page, total } = res;

        var tabs = list.map((item) => {
            return {
                courseId: item.courseId,
                courseTitle: item.courseTitle,
                upCount: item.upCount,
                coverImg: item.coverImg ? config.cdn_img_src + item.coverImg : config.cdn_tempimg_src
            }
        });

        tabs.forEach((item) => {
            state.list.push(item);
        })

        state.page = page;
        state.total = total;
    },
    [types.YXKCK_GET_LIST_PULL](state) {
        state.isPull = true;
    },
    [types.YXKCK_GET_LIST_NOPULL](state) {
        state.isPull = false;
    },
    [types.YXKCK_GET_CLASSTAL](state, res) {
        state.classTab = res.map((item) => {
            return {
                typeName: item.typeName,
                typeId: item.typeId
            }
        });
    },
    [types.YXKCK_RESET_DATA](state) {
        state.list.length = 0;
        state.page = 0;
        state.total = 0;
        state.isPull = true;
    },
    [types.YXKCK_GET_DETAIL](state, res) {
        Object.assign(state.detail, res);
    },
    [types.YXKCK_UPDATE_ZAN](state, courseId){
        state.list.forEach((item)=>{
            if(item.courseId == courseId){
                item.upCount += 1;
            }
        })
    },
    [types.YXKCK_DETAIL_UPDATE_ZAN](state){
        state.detail.elnCourse.upCount += 1;
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}
