import * as api from '../api'
import * as types from '../types'
import * as config from '@/lib/config'


const state = {
    title: [],
    list: [],
    page: 1,
    pageNo: 1,
    total: 1,
    articleType: '',
    detail: {
        content: '',
        pic: '',
        articleTitle: '',
        tags: '',
        upCount: ''
    }
}

const actions = {
    pxbyf_get_title({ commit, state }, req) {
        api.getFirstLevelList((res) => {

            var { data } = res;

            commit(types.PXBYF_GET_FL, data);

            api.pxyf_cmsArticle({
                articleType: data.list[0].typeId,
                pageNo: 1
            }, (res) => {
                commit(types.PXBYF_GET_LIST, res);
            });

            req.cb && req.cb();

        });
    },
    pxbyf_get_list({ commit, state }, req) {
        api.pxyf_cmsArticle(req, (res) => {
            commit(types.PXBYF_GET_LIST, res);
            req.cb && req.cb();
        });
    },
    pxyf_saveThumbArticle({ commit, state }, req) {
        api.pxyf_saveThumbArticle(req, (res) => {
            req.cb && req.cb(res);
        });
    },
    pxyf_searchPage({ commit, state }, req) {
        api.pxyf_searchPage(req, (res) => {
            commit(types.PXBYF_GET_LIST, res);
            req.cb && req.cb(res);
        });
    },
    pxyf_getDetail({ commit, state }, articleId) {
        api.pxyf_getDetail(articleId, (res) => {
            commit(types.PXBYF_LIST_DETAIL, res);
        });
    }
}

const getters = {

}

const mutations = {
    [types.PXBYF_GET_FL](state, res) {
        var { list } = res;


        if (list.length == 0) return;

        state.articleType = list[0].typeId;

        list = list.map((item, index) => {

            var obj = {};

            if (index == 0) {
                obj.on = true;
            } else {
                obj.on = false;
            }

            Object.assign(obj, {
                articleType: item.typeId,
                typeName: item.typeName,
                clas: 'icon' + (index + 1)
            })

            return obj;
        });

        state.title = list;

    },
    [types.PXBYF_GET_LIST](state, res) {

        var { list, page, total } = res.data;

        // state.page = page;
        state.total = total;

        list = list.map((item) => {
            return {
                tags: item.tags,
                articleTypeName: item.articleTypeName,
                viewCount: item.viewCount,
                upCount: item.upCount,
                articleTitle: item.articleTitle,
                articleTitleSub: item.articleTitleSub,
                pic: `${config.cdn_img_src}${item.pic}`,
                articleType: item.articleType,
                articleId: item.articleId
            }
        });

        list.forEach((item) => {
            state.list.push(item);
        });

    },
    [types.PXBYF_RESET_LIST](state, obj) {
        if (obj.articleType) {
            state.articleType = obj.articleType;
        }
        state.list.length = 0;
        state.title.forEach((item) => {
            item.on = false;
        });
        if (obj.index || obj.index == 0) {
            state.title[obj.index].on = true;
        }
    },
    [types.PXBYF_LIST_DETAIL](state, res) {
        var {cmsArticle, cmsArticleContentList} = res.data;
        if (res.data) {
            state.detail = {
                content: cmsArticleContentList[0].content,
                pic: `${config.cdn_img_src}${cmsArticle.pic}`,
                articleTitle: cmsArticle.articleTitle,
                tags: cmsArticle.tags,
                upCount: cmsArticle.upCount,
            }
        }
    },
    [types.PXBYF_LIST_ZAN](state, index) {
        state.list[index].upCount += 1;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
