import Vue from 'vue'
import Router from 'vue-router'

import * as config from "@/lib/config";
import * as utils from "@/lib/utils";


const Login = resolve => require(['@/pages/Login'], resolve);
const Center = resolve => require(['@/pages/center'], resolve);
const CenterPage = resolve => require(['@/pages/centerPage'], resolve);
/** 云学课程库 **/
//首页
const Library = resolve => require(['@/pages/cloud-library'], resolve);
//详情页
const LibraryDetail = resolve => require(['@/pages/cloud-library/library-detail'], resolve);
const LibraryHot = resolve => require(['@/pages/cloud-library/library-hot'], resolve);
const LibraryCollect = resolve => require(['@/pages/cloud-library/library-collect'], resolve);

/** 培训班 **/
//首页
const TrainingCourse = resolve => require(['@/pages/training-course'], resolve);
//培训评估
const Evaluation = resolve => require(['@/pages/training-course/evaluation'], resolve);
//详情页
const Registration = resolve => require(['@/pages/training-course/training-registration'], resolve);


/** 培训云浮 **/
const Trainingyunfu = resolve => require(['@/pages/training-yunfu'], resolve);
const Dynamics = resolve => require(['@/pages/training-yunfu/yunfu-dynamics'], resolve);

/** 考试  **/
const SimulatiionTest = resolve => require(['@/pages/simulation-test'], resolve);
const Entertest = resolve => require(['@/pages/simulation-test/enter-test'], resolve);
const Lookanswer = resolve => require(['@/pages/simulation-test/look-answer'], resolve);
const LookanswerError = resolve => require(['@/pages/simulation-test/look-answer-error'], resolve);
const Interface = resolve => require(['@/pages/simulation-test/test-interface'], resolve);

/** 微课大赛 **/
const Activities = resolve => require(['@/pages/training-activities'], resolve);
const ActivitiesDetail = resolve => require(['@/pages/training-activities/index-detail'], resolve);
const Competition = resolve => require(['@/pages/training-activities/micro-competition'], resolve);

/** 培训需求  */
const Traininglist = resolve => require(['@/pages/training-need/training-list'], resolve)
const Trainingneeds = resolve => require(['@/pages/training-need/training-needs'], resolve);


const Management = resolve => require(['@/pages/management'], resolve);
const Leanmanagement = resolve => require(['@/pages/management/lean-management'], resolve);
const Leanscenariol = resolve => require(['@/pages/management/lean-scenario'], resolve);
const Classroom = resolve => require(['@/pages/management/live-classroom'], resolve);
const Essence = resolve => require(['@/pages/management/management-essence'], resolve);

Vue.use(Router);

const router = new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            meta: {
                title: '认证'
            },
            component: Login,
        },
        {
            path: '/centerPage',
            meta: {
                title: '我的课堂'
            },
            name: 'CenterPage',
            component: CenterPage,
        },{
            path: '/center',
            meta: {
                title: '个人中心'
            },
            name: 'Center',
            component: Center,
        },
        {
            path: '/library',
            name: 'Library',
            meta: {
                title: '云学课程库'
            },
            component: Library,
            children: [{
                path: "librarydetail/:courseId",
                name: "LibraryDetail",
                component: LibraryDetail,
                meta: {
                    title: '云学课程库'
                }
            },{
                path: "libraryhot",
                name: "LibraryHot",
                component: LibraryHot,
                meta: {
                    title: '热门课程'
                }
            },{
                path: "Librarycollect",
                name: "LibraryCollect",
                component: LibraryCollect,
                meta: {
                    title: '课程收藏'
                }
            }]
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
            meta: {
                title: '模拟考试'
            },
            name: 'SimulatiionTest',
            component: SimulatiionTest,
            children: [{
                    path: "entertest/:examId",
                    name: "Entertest",
                    component: Entertest,
                    meta: {
                        title: '模拟考试'
                    }
                },
                {
                    path: "lookanswer/:detailId",
                    name: "Lookanswer",
                    component: Lookanswer,
                    meta: {
                        title: '模拟考试'
                    }
                }, {
                    path: "lookanswererror/:detailId",
                    name: "LookanswerError",
                    component: LookanswerError,
                    meta: {
                        title: '模拟考试'
                    }
                },
                {
                    path: "interface/:examId",
                    name: "Interface",
                    component: Interface,
                    meta: {
                        title: '模拟考试'
                    }
                }
            ]
        },
        {
            path: '/activities',
            name: 'Activities',
            meta: {
                title: '微课大赛'
            },
            component: Activities,
            children: [{
                path: "competition",
                name: "Competition",
                component: Competition,
                meta: {
                    title: '微课大赛'
                }
            },{
                path: "activitiesDetail/:objectId",
                name: "ActivitiesDetail",
                component: ActivitiesDetail,
                meta: {
                    title: '微课大赛'
                }
            }]
        }, {
            path: '/traininglist',
            name: 'Traininglist',
            meta: {
                title: '培训需求'
            },
            component: Traininglist,
            children: [{
                path: "trainingneeds/:voteId",
                name: "Trainingneeds",
                component: Trainingneeds,
                meta: {
                    title: '培训需求'
                }
            }]
        },
        {
            path: '/trainingCourse',
            meta: {
                title: '培训班'
            },
            name: 'TrainingCourse',
            component: TrainingCourse,
            children: [{
                    path: "evaluation/:classId",
                    name: "Evaluation",
                    component: Evaluation,
                    meta: {
                        title: '培训班'
                    }
                },
                {
                    path: "registration/:classId",
                    name: "Registration",
                    component: Registration,
                    meta: {
                        title: '培训班'
                    }
                }
            ]
        },
        {
            path: '/trainingyunfu',
            meta: {
                title: '培训云浮'
            },
            name: 'Trainingyunfu',
            component: Trainingyunfu,
            children: [{
                path: "dynamics/:articleId",
                name: "Dynamics",
                component: Dynamics,
                meta: {
                    title: '培训云浮'
                }
            }]
        },
    ]
});

router.afterEach((to, from) => {
    let title = to.meta.title || '';
    utils.setTitle(title);
})

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
    }
    //是否要认证 redirect_url
    if (ruleObj.isAuth) {
        if (utils.getParam('isVisitor') == 'Y') {
            window.localStorage.setItem('path', to.name);
            console.log('认证');
            router.push({ name: 'Login' });
            next();
        }
    }

    next();
});


export let getRuleObj = function(name) {
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
