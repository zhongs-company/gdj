export let api_url = 'http://api.pomesoft.com/sems-api';
// export let api_url = 'http://192.168.0.102:9999';
export let app_code = 'yunfu';
export let coopCode = 'yunfu';
export let redirect_url = 'http://192.168.0.101:8080';
export let error_url = 'http://ucenter.pomesoft.com/sems-ucenter/wxoauth-error.html';

export let accredit_url = `http://ucenter.pomesoft.com/sems-ucenter/oauth.jhtml?app_code=${app_code}&error_url=${error_url}&type=show`

export let cdn_img_src = "http://fileserver.pomesoft.com"
export let cdn_tempimg_src = 'http://fileserver.pomesoft.com/uploads/jibeidangxiao/resource/elnCourse/d2f742f2dd234abb823245f046ff6a7d.jpg'


if (process.env.NODE_ENV === 'production') {
    redirect_url = 'http://html.pomesoft.com/yunfu';
}

//页面是否要授权，是否要认证配置
//name 当前页面别名
//isAcredit 是否要授权
//isAuth 是否要认证
export const rulePage = [{
    name: 'Library', //云学课程库3
    isAcredit: true,
    isAuth: true
}, {
    name: 'TrainingCourse', //培训班4
    isAcredit: true,
    isAuth: true
}, {
    name: 'Registration', //培训班-详情
    isAcredit: true,
    isAuth: false
}, {
    name: 'Trainingyunfu', //培训云浮5
    isAcredit: true,
    isAuth: true
}, {
    name: 'SimulatiionTest', //考试6
    isAcredit: true,
    isAuth: true
}, {
    name: 'Entertest', //考试
    isAcredit: true,
    isAuth: false
}, {
    name: 'Login', //认证
    isAcredit: true,
    isAuth: false
}, {
    name: 'Activities', //培训活动1
    isAcredit: true,
    isAuth: true
}, {
    name: 'ActivitiesDetail', //培训活动1
    isAcredit: true,
    isAuth: true
}, {
    name: 'Traininglist', //培训需求2
    isAcredit: true,
    isAuth: true
}, {
    name: 'Center', //个人中心
    isAcredit: true,
    isAuth: false
}, {
    name: 'CenterPage', //个人中心
    isAcredit: true,
    isAuth: true
}];
