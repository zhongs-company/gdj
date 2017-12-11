import Vue from 'vue'
import Router from 'vue-router'

import * as config from "@/lib/config";
import * as utils from "@/lib/utils";


const Login = resolve => require(['@/pages/Login'], resolve);
const Center = resolve => require(['@/pages/center'], resolve);


const Library = resolve => require(['@/pages/cloud-library'], resolve);
const LibraryDetail = resolve => require(['@/pages/cloud-library/library-detail'], resolve);


const Management = resolve => require(['@/pages/management'], resolve);

const Leanmanagement = resolve => require(['@/pages/management/lean-management'], resolve);
const Leanscenariol = resolve => require(['@/pages/management/lean-scenario'], resolve);
const Classroom = resolve => require(['@/pages/management/live-classroom'], resolve);
const Essence = resolve => require(['@/pages/management/management-essence'], resolve);



const SimulatiionTest = resolve => require(['@/pages/simulation-test'], resolve);

const Entertest = resolve => require(['@/pages/simulation-test/enter-test'], resolve);
const Lookanswer = resolve => require(['@/pages/simulation-test/look-answer'], resolve);
const Interface = resolve => require(['@/pages/simulation-test/test-interface'], resolve);

const Activities = resolve => require(['@/pages/training-activities'], resolve);

const Competition = resolve => require(['@/pages/training-activities/micro-competition'], resolve);
const Trainingneeds = resolve => require(['@/pages/training-activities/training-needs'], resolve);
const Registration = resolve => require(['@/pages/training-activities/training-registration'], resolve);


const TrainingCourse = resolve => require(['@/pages/training-course'], resolve);

const Evaluation = resolve => require(['@/pages/training-course/evaluation'], resolve);


const Trainingyunfu = resolve => require(['@/pages/training-yunfu'], resolve);

const Dynamics = resolve => require(['@/pages/training-yunfu/yunfu-dynamics'], resolve);
const Alerts = resolve => require(['@/pages/training-yunfu/yunfu-alerts'], resolve);

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/center',
            name: 'Center',
            component: Center,
        },
        {
            path: '/library',
            name: 'Library',
            component: Library,
            children: [
                { path: "librarydetail", name: "LibraryDetail", component: LibraryDetail }
            ]
        },
        {
            path: '/management',
            name: 'Management',
            component: Management,
            children: [
                { path: "leanmanagement", name: "Leanmanagement", component: Leanmanagement },
                { path: "leanscenariol", name: "Leanscenariol", component: Leanscenariol },
                { path: "classroom", name: "Classroom", component: Classroom },
                { path: "essence", name: "Essence", component: Essence },
            ]
        },
        {
            path: '/simulatiionTest',
            name: 'SimulatiionTest',
            component: SimulatiionTest,
            children: [
                { path: "entertest", name: "Entertest", component: Entertest },
                { path: "lookanswer", name: "Lookanswer", component: Lookanswer },
                { path: "interface", name: "Interface", component: Interface }
            ]
        },
        {
            path: '/activities',
            name: 'Activities',
            component: Activities,
            children: [
                { path: "competition", name: "Competition", component: Competition },
                { path: "trainingneeds", name: "Trainingneeds", component: Trainingneeds },
                { path: "registration", name: "Registration", component: Registration }
            ]
        },
        {
            path: '/trainingCourse',
            name: 'TrainingCourse',
            component: TrainingCourse,
            children: [
                { path: "evaluation", name: "Evaluation", component: Evaluation },
                { path: "registration", name: "Registration1", component: Registration }
            ]
        },
        {
            path: '/trainingyunfu',
            name: 'Trainingyunfu',
            component: Trainingyunfu,
            children: [
                { path: "dynamics", name: "Dynamics", component: Dynamics },
                { path: "alerts", name: "Alerts", component: Alerts }
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {

    var ruleObj = getRuleObj(to.name);
   
    //是否需要授权
    if (ruleObj.isAcredit) {
        //授权地址
        var redirect_url = encodeURIComponent(`${config.redirect_url}/#${to.path}`)
        var accredit_url = `${config.accredit_url}&redirect_url=${redirect_url}`;
        utils.wxChankeAuthorize(accredit_url, (userInfo) => {
            next();
        });
        console.log('授权');
        return;
    }
    //是否要认证 redirect_url
    if (ruleObj.isAuth) {
        router.push({ path: '/' });
        next();
        console.log('认证');
        return;
    }
    next();
});


export let getRuleObj = function (name) {
    var ruleObj = {};
    if (config.rulePage.length == 0) return ruleObj;
    config.rulePage.forEach((item) => {
        if (item.name == name) {
            return (ruleObj = item)
        }
    });
    return ruleObj;
}

export default router;
