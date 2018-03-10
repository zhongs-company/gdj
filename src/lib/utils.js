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
    let match = RegExp(`[?&]${attr}=([^&]*)`).exec(url || window.location.search)
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
    m < 10 ? m = '0' + m : m;
    var d = t.getDate();
    d < 10 ? d = '0' + d : d;
    var h = t.getHours();
    h < 10 ? h = '0' + h : h;
    var f = t.getMinutes();
    f < 10 ? f = '0' + f : f;

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

export let abc = (n) => {
    var digit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    return digit[n];
}

export let setTitle = (title) => {
    document.title = title
    var mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
        var iframe = document.createElement('iframe')
        iframe.style.visibility = 'hidden'
        // 替换成站标favicon路径或者任意存在的较小的图片即可
        iframe.setAttribute('src', 'http://fileserver.pomesoft.com/uploads/yunfu/exam/logo07126fb9461f43108852611981d9f357.jpg')
        var iframeCallback = function() {
            setTimeout(function() {
                iframe.removeEventListener('load', iframeCallback)
                document.body.removeChild(iframe)
            }, 0)
        }
        iframe.addEventListener('load', iframeCallback)
        document.body.appendChild(iframe)
    }
}
