import * as utils from "@/lib/utils";
import * as config from "@/lib/config";

// 公共参数
function commonParams(cb) {
    var comParams = ['coopCode', 'openid', 'frontUserId', 'accessToken', 'nickname', 'headimgurl'];
    var params = {
        coopCode:'yunfu'
    };
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
//取消点赞
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


//收藏
export let elnCourseFavorite = function(req, cb) {

    var reqObj = Object.assign(req, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnCourse.action?m=saveFavorite`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('收藏课程接口 ajax error', reqObj);
        }
    });

}

//取消收藏
export let elnCourseFavoriteCancel = function(req, cb) {

    var reqObj = Object.assign(req, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnCourse.action?m=cancelFavorite`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('取消收藏课程接口 ajax error', reqObj);
        }
    });

}

//热门课程
///api/elnCourse.action?m=getPageHot
export let elnCourseGetPageHot = function(req, cb) {

    var reqObj = Object.assign(req, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnCourse.action?m=getPageHot`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('热门课程接口 ajax error', reqObj);
        }
    });

}

//课程收藏
//api/elnCourse.action?m=getPageFavorite
export let elnCourseGetPageFavorite = function(req, cb) {

    var reqObj = Object.assign(req, commonParams());

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnCourse.action?m=getPageFavorite`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('课程收藏接口 ajax error', reqObj);
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
        data: reqObj,
        success: res => {

            //alert('接口返回值：',res);

            cb && cb(res);
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
        classId: req.classId
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


//评论列表
export let elnClassTopicList = function(req, cb) {

    var reqObj = Object.assign({
        m: 'getPage',
        groupId: req.groupId,
        pageNo: req.pageNo,
        pageSize: 10
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

//发评论
export let elnClassPushTopic = function(req, cb) {
    var common = commonParams();
    var reqObj = Object.assign(common, {
        m: 'insert',
        groupId: req.groupId,
        content: req.content,
        headimgurl: req.headimgurl,
        nickname: req.nickname
    });

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

//培训报名
export let elnClassUser = function(req, cb) {
    var common = commonParams();
    var reqObj = Object.assign(common, {
        m: 'insert',
        classId: req.classId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnClassUser.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('elnClass.action接口 ajax error', reqObj);
        }
    });
}


//取消培训报名
//api/elnClassUser.action?m=delete
export let elnClassUserQx = function(req, cb) {
    var common = commonParams();
    var reqObj = Object.assign(common, {
        m: 'delete',
        classId: req.classId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnClassUser.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('elnClass.action接口 ajax error', reqObj);
        }
    });
}

//培训评估
export let elnClassPxpg = function(req, cb) {
    var common = commonParams();
    var reqObj = Object.assign(common, {
        m: 'getClassEvaluateSignle',
        classId: req.classId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnClass.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('培训评估接口 ajax error', reqObj);
        }
    });
}

//提交评估
export let elnClassvoteInfo = function(req, cb) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'saveUserAnswer',
        voteId: req.voteId,
        userAnswerJson: req.userAnswerJson
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteInfo.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('提交评估 ajax error', reqObj);
        }
    });
}

//培训云浮==================
//分类
export let getFirstLevelList = function(cb) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getFirstLevelList',
        type: 'cms_article_type'
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/sysType.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('sysType ajax error', reqObj);
        }
    });
}

//获取文章列表
export let pxyf_cmsArticle = function(req, cb) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getPage',
        articleType: req.articleType,
        pageSize: 10,
        pageNo: req.pageNo
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/cmsArticle.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('cmsArticle ajax error', reqObj);
        }
    });
}

//文章点赞
export let pxyf_saveThumbArticle = function(req, cb) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'saveThumbArticle',
        articleId: req.articleId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/cmsArticleThumb.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('cmsArticle ajax error', reqObj);
        }
    });
}

//文章搜索
export let pxyf_searchPage = function(req, cb) {
    var common = commonParams();
    var reqObj = Object.assign(common, {
        m: 'searchPage',
        pageSize: 10,
        keyword: req.keyword,
        pageNo: req.pageNo
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/cmsArticle.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('cmsArticle ajax error', reqObj);
        }
    });
}

//文章详情
export let pxyf_getDetail = function(articleId, cb) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getDetail',
        articleId: articleId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/cmsArticle.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('cmsArticle ajax error', reqObj);
        }
    });
}

/** 认证 */
export let rz = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'bindUserByWorkId',
        workId:req.workId,
        realName:req.realName
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/frontUser.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('rz ajax error', reqObj);
        }
    });
}

/** 考试  */
//获取列表
export let ks_getMyCanExamAll = function(req, cb) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getMyCanExamAll',
        examTitle: req.examTitle
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/examInfo.action`,
        data: reqObj,
        success: res => {
            cb && cb(res);
        },
        error: res => {
            error('ks_getMyCanExamAll ajax error', reqObj);
        }
    });
}

//考试详情
export let ks_getDetail = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getDetail',
        examId: req.examId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/examInfo.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}


//开始考试
export let ks_beginExam = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'beginExam',
        examId: req.examId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/examUserDetail.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}

//查看所有题目
export let ks_allAnswer = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getDetail',
        detailId: req.detailId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/examUserDetail.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}



//答题提交
export let ks_saveItemAnswer = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'saveItemAnswer',
        itemId: req.itemId,
        detailId: req.detailId,
        answer: req.answer
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/examUserAnswer.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}

//提交/api/examUserDetail.action?m=completeExam
export let ks_completeExam = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'completeExam',
        paperId: req.paperId,
        detailId: req.detailId,
        examId: req.examId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/examUserDetail.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}

/** 微课大赛 */

// 初始化
export let pxhd_seach = function(req) {

///api/voteActivityObject.action?m=searchPage

    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'searchPage',
        keyword: req.keyword
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteActivityObject.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}

// 初始化
export let pxhd_init = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getDetail',
        activityId: 'eae6369c056e4de08477d74d0d49c5ed'
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteActivity.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}

//列表接口
export let pxhd_voteActivityObject = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getPageRank',
        catId: req.catId,
        pageNo: req.pageNo,
        objectTitle: req.objectTitle,
        objectCode: req.objectCode || ''
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteActivityObject.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}


//列表详情
export let pxhd_voteActivityObject_detail = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        objectId: req.objectId,
        m: 'getDetail',
    });
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteActivityObject.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}


///api/voteActivityLog.action?m=insert  (排序号：2)
//列表点赞
export let pxhd_voteActivityLog = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'insert',
        activityId: req.activityId,
        objectId: req.objectId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteActivityLog.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}


//培训需求--列表
export let pxxq_voteInfo = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getPage'
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteInfo.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}

//培训需求--题目
export let pxxq_voteInfo_getDetail = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getDetail',
        voteId: req.voteId
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteInfo.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}


//培训需求--提交
export let pxxq_voteInfo_saveUserAnswer = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'saveUserAnswer',
        voteId: req.voteId,
        userAnswerJson: req.userAnswerJson
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/voteInfo.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}


//个人中心-我的课堂
///api/elnClassUser.action?m=getMyClassPage
export let center_getMyClassPage = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getMyClassPage'
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/elnClassUser.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}

// /api/frontUser.action?m=getByFrontUserId
export let get_user_info = function(req) {
    var common = commonParams();

    var reqObj = Object.assign(common, {
        m: 'getByFrontUserId'
    });

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: `${config.api_url}/api/frontUser.action`,
        data: reqObj,
        success: res => {
            req.success && req.success(res);
        },
        error: res => {
            error('ajax error', reqObj);
        }
    });
}