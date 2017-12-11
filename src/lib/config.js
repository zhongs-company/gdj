export let api_url = 'http://api.pomesoft.com/sems-api';
export let app_code = 'yunfu';
export let coopCode = 'jibeidangxiao';
export let redirect_url = 'http://192.168.0.101:8080';
export let error_url = 'http://ucenter.pomesoft.com/sems-ucenter/wxoauth-error.html';

export let accredit_url = `http://ucenter.pomesoft.com/sems-ucenter/oauth.jhtml?app_code=${app_code}&error_url=${error_url}&type=shadow`

export let cdn_img_src = "http://fileserver.pomesoft.com"
export let cdn_tempimg_src = 'http://fileserver.pomesoft.com/uploads/jibeidangxiao/resource/elnCourse/d2f742f2dd234abb823245f046ff6a7d.jpg'


if (process.env.NODE_ENV === 'production') {
    redirect_url ='http://html.pomesoft.com/yunfu/';
}

//页面是否要授权，是否要认证配置
//name 当前页面别名
//isAcredit 是否要授权
//isAuth 是否要认证
export const rulePage = [{
    name: 'Library',   //云学课程库
    isAcredit: true,
    isAuth: false
}, {
    name: 'TrainingCourse',  //培训班
    isAcredit: true,
    isAuth: false
}];
