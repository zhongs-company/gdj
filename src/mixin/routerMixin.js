// 定义一个混合对象
import * as config from "@/lib/config";
import * as utils from "@/lib/utils";

export default {
    beforeRouteEnter(to, from, next) {
        
        var ruleObj = utils.getRuleObj(to.name);
        //是否需要授权
        if (ruleObj.isAcredit) {
            //授权地址
            var redirect_url = encodeURIComponent(`${config.redirect_url}/#${to.path}`)
            var accredit_url = `${config.accredit_url}&redirect_url=${redirect_url}`;
            utils.wxChankeAuthorize(accredit_url, (userInfo) => {
                next();
            });
            console.log('授权');
        }
        //是否要认证 redirect_url
        if (ruleObj.isAuth) {
            router.push({ path: '/' });
            next();
            console.log('认证');
        }
        next();
    }
}
