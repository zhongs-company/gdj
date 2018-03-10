import * as api from '../api'
import * as types from '../types'
import * as config from "@/lib/config";
import * as utils from "@/lib/utils";


const state = {
    list: [],
    page: 0,
    total: 0,
    isPull: true,
    classTab: [],
    detail: {
        elnCourse: {},
        commonAttachmentList: {},
        elnTeacher: {
            teacherDesc: ''
        }
    },
    hotList:[],
    favoriteList:[]
}

const actions = {
    // 获取列表数据
    getElnCourse({ commit, state }, req) {
        commit(types.YXKCK_GET_LIST_NOPULL);
        api.elnCourse(req, (res) => {
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
    yxkck_getDetail({ commit, state }, req) {
        commit(types.YXKCK_RESET_DATA_DETAIL);
        api.elnCourseNew(req, (res) => {
            commit(types.YXKCK_GET_DETAIL, res);
            commit(types.LOADER_HIDE);
            if (res && res.elnCourse) {
                utils.setTitle(res.elnCourse.courseTitle);
            }
        })
    },

    //点赞
    yxkck_zan({ commit, state }, courseId) {
        api.elnCourseThumb({
            m: "saveThumbCourse",
            courseId
        }, (res) => {
            if (res.ret == 0) {
                commit(types.MSG_POPUP_SHOW, { value: '点赞成功！' });
                commit(types.YXKCK_UPDATE_ZAN, courseId);

            }
            if (res.err_code == 4) {
                commit(types.MSG_POPUP_SHOW, { value: '您已经点赞了！' });
            }
        });
    },

    //取消点赞
    yxkck_zan_cancel({ commit, state }, courseId) {
        api.elnCourseThumb({
            m: "deleteThumbCourse",
            courseId
        }, (res) => {
            if (res.ret == 0) {
                commit(types.MSG_POPUP_SHOW, { value: '已取消点赞！' });
                commit(types.YXKCK_UPDATE_ZAN_REDUCE, courseId);
            }
            // if (res.err_code == 4) {
            //     commit(types.MSG_POPUP_SHOW, { value: '您已经点赞了！' });
            // }
        });
    },

    //收藏
    yxkck_elnCourseFavorite({ commit, state }, courseId) {
        api.elnCourseFavorite({ courseId: courseId }, data => {
            if (data.ret == "0") {
                //   this.$store.commit("YXKCK_SC");
                commit(types.MSG_POPUP_SHOW, {
                    value: "收藏成功！"
                });
                commit(types.YXKCK_SC_ADD, courseId);
            } else {
                commit(types.MSG_POPUP_SHOW, {
                    value: data.msg
                });
            }
        });
    },
    //取消收藏
    yxkck_elnCourseFavoriteCancel({ commit, state }, courseId) {
        api.elnCourseFavoriteCancel({ courseId: courseId }, data => {
            if (data.ret == "0") {
                commit(types.MSG_POPUP_SHOW, {
                    value: "已取消！"
                });
                commit(types.YXKCK_SC_REDUCE, courseId);
            } else {
                commit(types.MSG_POPUP_SHOW, {
                    value: data.msg
                });
            }
        });
    },
    //热门课程
    yxkck_elnCourseGetPageHot({ commit, state }){
        api.elnCourseGetPageHot({}, (res)=>{
            if( res.data && res.data.list ){
                if( res.data.list.length > 0 ){
                    commit(types.YXKCK_GET_PAGE_HOT, res.data.list);
                }
            }
        })
    },
    //收藏课程
    yxkck_elnCourseGetPageFavorite({ commit, state }){
        api.elnCourseGetPageFavorite({}, (res)=>{
            if( res.data && res.data.list ){
                if( res.data.list.length > 0 ){
                    commit(types.YXKCK_GET_PAGE_FAVORITE, res.data.list);
                }
            }
        })
    }
}

const getters = {

}

const mutations = {
    [types.YXKCK_GET_LIST](state, res) {

        var { list, page, total } = res;

        var tabs = list.map((item) => {
            return {
                isThumb: item.isThumb,
                isFavorite: item.isFavorite,
                favoriteCount: item.favoriteCount,
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

    [types.YXKCK_RESET_DATA_DETAIL](state) {
        state.detail = {
            elnCourse: {},
            commonAttachmentList: {},
            elnTeacher: {
                teacherDesc: ''
            }
        }
    },
    //点赞加一
    [types.YXKCK_UPDATE_ZAN](state, courseId) {
        state.list.forEach((item) => {
            if (item.courseId == courseId) {
                item.upCount += 1;
                item.isThumb = 'Y';
            }
        });
    },
    //点赞减一
    [types.YXKCK_UPDATE_ZAN_REDUCE](state, courseId) {
        state.list.forEach((item) => {
            if (item.courseId == courseId) {
                item.upCount -= 1;
                item.isThumb = 'N';
            }
        });
    },

    //收藏加一
    [types.YXKCK_SC_ADD](state, courseId) {
        state.list.forEach((item) => {
            if (item.courseId == courseId) {
                item.favoriteCount += 1;
                item.isFavorite = 'Y';
            }
        });
    },
    //取消收藏减一
    [types.YXKCK_SC_REDUCE](state, courseId) {
        state.list.forEach((item) => {
            if (item.courseId == courseId) {
                item.favoriteCount -= 1;
                item.isFavorite = 'N';
            }
        });
    },

    //详情赞
    [types.YXKCK_DETAIL_UPDATE_ZAN](state) {
        state.detail.elnCourse.upCount += 1;
        state.detail.isThumb = 'Y';
    },
    //详情取消赞
    [types.YXKCK_DETAIL_UPDATE_ZAN_REDUCE](state) {
        state.detail.elnCourse.upCount -= 1;
        state.detail.isThumb = 'N';
    },

    //详情收藏
    [types.YXKCK_DETAIL_SC](state) {
        state.detail.isFavorite = 'Y';
        state.detail.elnCourse.favoriteCount += 1;
    },

    //详情取消收藏
    [types.YXKCK_DETAIL_SC_REDUCE](state) {
        state.detail.isFavorite = 'N';
        state.detail.elnCourse.favoriteCount -= 1;
    },

    //热门课程
    [types.YXKCK_GET_PAGE_HOT](state, hotList){
        state.hotList = state.hotList.concat(hotList);
    },
    //课程收藏
    [types.YXKCK_GET_PAGE_FAVORITE](state, favoriteList){
        state.favoriteList = state.favoriteList.concat(favoriteList);
    }
}


export default {
    state,
    actions,
    getters,
    mutations
}
