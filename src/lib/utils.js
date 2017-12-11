import * as config from "@/lib/config";

function isType(type) {
    return function(obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
    }
}

export var isObject = isType("Object")
export var isString = isType("String")
export var isArray = Array.isArray || isType("Array")
export var isFunction = isType("Function")
export var isUndefined = isType("Undefined")

/**
 *用来解析url参数
 *返回 key value 键值对对象
 */
export var parseQueryString = function(url) {
    var obj = {};
    var start = url.indexOf("?") + 1;
    var str = url.substr(start);
    start = str.indexOf("#");
    str = str.substr(0, start);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}

//获取url param
export const getParam = function(attr, url) {
    let match = RegExp(`[?&]${attr}=([^&]*)`).exec( url || window.location.search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export let userInfo = {
    coopCode: config.coopCode
};

//不同页面授权，跳的授权地址
export let wxChankeAuthorize = function(accredit_url, cb) {
    if (!getParam('openid')) {
        // alert(accredit_url)
        window.location.href = accredit_url;
        return;
    } else {
        //http://192.168.0.101:8080/?
        //openid=ofvEA05VwcbBX8bb3IsL21i_134U&
        //frontUserId=22682ccf832345c19cd1ddf5ccec4411&
        //accessToken=tmptoken&
        //isVisitor=Y&
        //appCode=yunfu&
        //coopCode=yunfu&
        //pno=null


        userInfo = Object.assign(userInfo, parseQueryString(window.location.href));
        cb && cb(userInfo);
    }
}


export let setDate = (date) => {

    var t = new Date(date);
    var m = t.getMonth() + 1;
    var d = t.getDate();
    var h = t.getHours();
    var f = t.getMinutes();

    return m + '月' + d + '日   ' + '  ' + h + ':' + f;
}

export let throttle = (fn, interval) => {
    var interval = interval ? interval : 100;
    var canRun = true;
    return function() {
        var _this = this;
        if (!canRun) return;
        canRun = false;
        setTimeout(function() {
            fn.apply(_this, arguments);
            canRun = true;
        }, interval)
    }
}
