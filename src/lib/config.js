export const api_url = 'http://api.pomesoft.com/sems-api';
export const app_code = 'yunfu';
export const coopCode = 'yunfu';
export const redirect_url = 'http://192.168.0.101:8080';
export const error_url = 'http://ucenter.pomesoft.com/sems-ucenter/wxoauth-error.html';

export const accredit_url = `http://ucenter.pomesoft.com/sems-ucenter/oauth.jhtml?app_code=${app_code}&redirect_url=${redirect_url}&error_url=${error_url}&type=shadow`

export let userInfo = {};

//获取url param
export const getParam = function (attr) {
    let match = RegExp(`[?&]${attr}=([^&]*)`).exec(window.location.search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export let wxChankeAuthorize = function ( cb ) {
    if(!getParam('openid')){
        window.location.href = accredit_url;
        return;
    }else{
        //http://192.168.0.101:8080/?
        //openid=ofvEA05VwcbBX8bb3IsL21i_134U&
        //frontUserId=22682ccf832345c19cd1ddf5ccec4411&
        //accessToken=tmptoken&
        //isVisitor=Y&
        //appCode=yunfu&
        //coopCode=yunfu&
        //pno=null

        userInfo.openid = getParam("openid");
        userInfo.frontUserId = getParam("frontUserId");
        userInfo.accessToken = getParam("accessToken");
        userInfo.isVisitor = getParam("isVisitor");
        userInfo.appCode = getParam("appCode");
        userInfo.coopCode = getParam("coopCode");
        userInfo.pno = getParam("pno");

        cb && cb(userInfo)

    }
}
