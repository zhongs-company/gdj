import * as utils from "@/lib/utils";
import * as config from "@/lib/config";

// 公共参数
function commonParams(cb) {
    var comParams = ['coopCode', 'openid', 'frontUserId', 'accessToken', 'nickname', 'headimgurl'];
    var params = {};
    var userInfo = utils.userInfo;
    comParams.forEach((item) => {
        if (item in userInfo) {
            params[item] = userInfo[item]
        } else {
            params[item] = null;
        }
    });
    return params;
}

function error(str) {
    console.error && console.error(str);
}

/** 培训云浮  m=getFirstLevelList  type=cms_article_type **/
//云学课程库-分类  m=getTypeTree   type=course_type
// 分类tab 
export let sysType = function(req, cb) {

    var reqObj = Object.assign({
        m: req.m,
        type: req.type
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
export let cmsArticle = function(req, cb) {

    var reqObj = Object.assign({
        m: "getPage",
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
            error('cmsArticle.action接口 ajax error', reqObj);
        }
    });
}
/** 云学课程库 **/
//课程列表 getPage
//点击分类 getPage
//也是搜索接口 searchByKeywordPage  
export let elnCourse = function(req, cb) {

    var reqObj = Object.assign({
        m: req.m,
        courseType: req.typeId || "",
        courseTitle: "",
        courseCode: "",
        contentType: "",
        pageSize: 10,
        pageNo: req.pageNo
    }, commonParams());

    if (req.keyword) {
        reqObj = Object.assign(reqObj, { keyword: req.keyword });
    }

    // console.log(reqObj);

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnCourse.action`,
        data: reqObj,
        success: res => {
            if (res.ret != 0) {
                error('elnCourse.action接口res.ret!=0');
            };
            cb && cb(res.data)
        },
        error: res => {
            error('elnCourse.action接口 ajax error', reqObj);
        }
    });

}

//能获取详情
export let elnCourseNew = function(req, cb) {

    var reqObj = Object.assign(req, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnCourse.action`,
        data: reqObj,
        success: res => {
            if (res.ret != 0) {
                error('elnCourse.action接口res.ret!=0');
            };
            cb && cb(res.data)
        },
        error: res => {
            error('elnCourse.action接口 ajax error', reqObj);
        }
    });

}

//点赞
export let elnCourseThumb = function(req, cb) {

    var reqObj = Object.assign(req, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnCourseThumb.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('elnCourseThumb.action接口 ajax error', reqObj);
        }
    });

}

/** 培训班 **/

//班级列表
export let elnClass = function(req, cb) {

    var reqObj = Object.assign({
        m: req.m,
        pageSize: 10,
        pageNo: req.pageNo
    }, commonParams());

    if (req.className) {
        reqObj = Object.assign(reqObj, { className: req.className });
    }

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnClass.action`,
        data: reqObj,
        success: res => {
            if (res.ret == 0) {
                cb && cb(res.data);
            }
        },
        error: res => {
            error('elnClass.action接口 ajax error', reqObj);
        }
    });

}

//扫码签到
export let qd = (signId, cb) => {

    var reqObj = Object.assign({
        m: 'saveClassSign',
        signId
    }, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnSignLog.action`,
        data:reqObj,
        success: res => {
            cb && cb();
        },
        error: res => {
            error('elnClass.action接口 ajax error', reqObj);
        }
    });
}

//详情
export let elnClassDetail = function(req, cb) {

    var reqObj = Object.assign({
        m: 'getDetail',
        classId:req.classId
    }, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnClass.action`,
        data: reqObj,
        success: res => {
            if (res.ret == 0) {
                cb && cb(res.data);
            }
        },
        error: res => {
            error('elnClass.action接口 ajax error', reqObj);
        }
    });
}

//评论
export let elnClassTopicList = function(req, cb) {

    var reqObj = Object.assign({
        m: 'getPage',
        groupId:req.groupId,
        pageNo:req.pageNo,
        pageSize:10
    }, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/forumTopic.action`,
        data: reqObj,
        success: res => {
            if (res.ret == 0) {
                cb && cb(res.data);
            }
        },
        error: res => {
            error('elnClass.action接口 ajax error', reqObj);
        }
    });
}
