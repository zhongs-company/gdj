import * as config from '@/lib/config'
import * as utils from '@/lib/utils'


// 公共参数
function commonParams() {
    var params = {};
    params.coopCode = config.userInfo.coopCode || null;
    params.openid = config.userInfo.openid || null;
    params.frontUserId = config.userInfo.frontUserId || null;
    params.accessToken = config.userInfo.accessToken || null;
    params.nickname = config.userInfo.nickname || null;
    params.headimgurl = config.userInfo.headimgurl || null;
    return params;
}

function error(str) {
    console.error && console.error(str);
}

/** 培训云浮 **/
// 分类tab
export let sysType = function (req, cb) {

    var reqObj = Object.assign({
        m: "getFirstLevelList",
        coopCode: "wxshake",
        type: "cms_article_type"
    }, commonParams());

    $.ajax({
        type: "POST",
        dataType: "jsonp",
        url: `${config.api_url}/api/sysType.action`,
        data: reqObj,
        success: res => {
            var data = res.data;
            if (res.ret != 0) {
                error('sysType.action接口res.ret!=0');
            };
            if (!data.list) {
                error('sysType.action接口res.list数据不存在');
            }
            if (!utils.isArray(data.list)) {
                error('sysType.action接口res.list不是数组格式');
            }
            cb && cb(data.list)
        },
        error: res => {
            error('sysType.action接口 ajax error', reqObj);
        }
    });
}
//文章列表
export let cmsArticle = function (req, cb) {

    var reqObj = Object.assign({
        m: "getPage",
        coopCode: "wxshake",
        pageSize: req.pageSize,
        pageNo: req.pageNo,
        articleType: req.typeId //分类tab接口 typeId
    }, commonParams());

    $.ajax({
        type: "POST",
        dataType: "jsonp",
        url: `${config.api_url}/api/cmsArticle.action`,
        data: reqObj,
        success: res => {
            if (res.ret != 0) {
                error('cmsArticle.action接口res.ret!=0');
            };
            cb && cb(res.data)
        },
        error: res => {
            error('sysType.action接口 ajax error', reqObj);
        }
    });
}
