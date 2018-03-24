<template>
    <div class="body">
        <div class="contentBox">
            <div class="title">
                <div class="left">
                    <div class="searchLogo"></div>
                    <input class="search" placeholder="培训班搜索" v-model="inputValue" v-on:keyup.enter="submit">
                </div>
                <div class="right" @click="scanQRcode"><span></span></div>
            </div>
            <ul class="peixunList" v-scroll>
                <li class="item" v-for="(li, index) in list" :key="index" @click="toDetail(li.classId)">
                    <img class="pic" :src="li.classLogo">
                    <h2>{{li.className}}</h2>
                    <p><i></i><em>{{li.createTime}}</em></p>
                    <span>{{li.memo}}</span>
                    <div v-if="li.classPhase==='training'" class="btn on">开课中</div>
                    <div v-if="li.classPhase === 'evaluate'" class="btn on">开课中</div>
                    <div v-if="li.classPhase === 'course'" class="btn on">开课中</div>
                    <div v-if="li.classPhase === 'exam'" class="btn on">开课中</div>
                    <div v-if="li.classPhase === 'sign'" class="btn on">开课中</div>
                    <div v-if="((li.classPhase === 'enroll' ||li.classPhase==='waitbegin' ) && li.isApplyed === 'N')" class="btn on" @click.stop="pxbm(li.classId)">立即报名</div>
                    <div v-if="((li.classPhase === 'enroll' || li.classPhase==='waitbegin') && li.isApplyed === 'Y')" class="btn on" @click.stop="qxbm(li.classId)">取消报名</div>
                    <div v-if="li.classPhase === 'complete'" class="btn on">已结束</div>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapState } from "vuex";
import * as utils from "@/lib/utils";
import * as config from "@/lib/config";
import * as api from "@/vuex/api";

export default {
    computed: mapState({
        list: state => state.pxb.list,
        page: state => state.pxb.page,
        total: state => state.pxb.total
    }),
    data() {
        return {
            inputValue: "",
            isPull: true
        };
    },
    created() {
        this.$store.dispatch("pxb_getList", { m: "getPage", pageNo: 1 });

        // $.ajax({
        //   url:"http://ucenter.pomesoft.com/sems-ucenter/jssdk.jhtml?appCode=" + config.app_code,
        //   data: {
        //     url: window.location.href
        //   },
        //   type: "jsonp",
        //   dataType: "jsonp",
        //   success: function(data) {
        //     //alert(JSON.stringify(data));
        //     // 微信配置
        //     wx.config({
        //       debug: false,
        //       appId: data.appId,
        //       timestamp: data.timestamp,
        //       nonceStr: data.nonceStr,
        //       signature: data.signature,
        //       jsApiList: ["scanQRCode"] // 功能列表，我们要使用JS-SDK的什么功能
        //     });
        //   },
        //   error: function(sucData) {
        //     //alert(sucData["return_info"]);
        //   }
        // });
    },
    mounted() {
        var node = document.querySelector(".peixunList");
        node.addEventListener(
            "scroll",
            utils.throttle(() => {
                if (this.page >= this.total) {
                    return;
                }

                var scroll_h = node.scrollHeight;
                var view_h = node.offsetHeight;
                var scroll_top = node.scrollTop;

                //整个列表的高度 - ( 滚动的高度 + 盒子的高度 )
                if (scroll_h - view_h - scroll_top < 200 && this.isPull) {
                    this.isPull = false;
                    this.page += 1;
                    this.$store.dispatch("pxb_getList", {
                        m: "getPage",
                        pageNo: this.page,
                        cb: () => {
                            this.isPull = true;
                        }
                    });
                }
            }),
            false
        );
    },
    methods: {
        submit() {
            if (this.inputValue.trim()) {
                this.$store.commit("PXB_RESET");
                this.$store.dispatch("pxb_getList", {
                    m: "getPage",
                    pageNo: 1,
                    className: this.inputValue.trim()
                });
            } else {
                this.$store.commit("MSG_POPUP_SHOW", {
                    value: "搜索信息不能为空！"
                });
            }
        },
        scanQRcode() {
            var _this = this;
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function(res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    var signId = utils.getParam("id", result);

                    if (signId) {
                        api.qd(signId, res => {
                            //alert(JSON.stringify(res))
                            if (res.ret == 0) {
                                _this.$store.commit("MSG_POPUP_SHOW", {
                                    value: "签到成功！"
                                });
                            } else {
                                _this.$store.commit("MSG_POPUP_SHOW", {
                                    value: res.msg
                                });
                            }
                        });
                    }
                }
            });
        },
        toDetail(classId) {
            this.$router.push({ path: `/trainingCourse/registration/${classId}` });
        },
        pxbm(classId) {
            // var { classId } = this.$route.params;

            api.elnClassUser({ classId }, (res) => {
                if (res.ret == 0) {
                    this.$store.commit('MSG_POPUP_SHOW', {
                        value: '您已成功报名~'
                    });

                    this.$store.commit('PXB_IS_BM', classId);
                    return;
                }
                if (res.ret == -1) {
                    this.$store.commit('MSG_POPUP_SHOW', {
                        value: '您已报名，请不要重复报名!'
                    });
                    return;
                }
                this.$store.commit('MSG_POPUP_SHOW', {
                    value: '报名失败!'
                });
            });
        },
        qxbm(classId) {
            if (confirm("您确定取消报名吗？")) {
                api.elnClassUserQx({ classId }, (res) => {
                    if (res.ret == 0) {
                        this.$store.commit('MSG_POPUP_SHOW', {
                            value: '您已成功取消报名~'
                        });
                        this.$store.commit('PXB_IS_BM', classId);

                        return;
                    }
                });
            } else {

            }

        }
    }
};

</script>
<style lang="scss" scoped>
.body {
    width: 100%;
    height: 100%;
}

@import "../../scss/_mixins.scss";
html {
    background: #e6f4ff;
}

.contentBox {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    display: flex;
    flex-direction: column;
    .title {
        height: to(110);
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 to(30);
        .left {
            @include wh(560, 50);
            background: #fff;
            border-radius: to(30);
            display: flex;
            justify-content: center;
            align-items: center;
            .searchLogo {
                @include wh(26, 26);
                background: url(../../assets/img/search.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(15);
            }
            .search {
                height: 100%;
            }
        }
        .right {
            font-size: $addFontSize4;
            color: #040404;
            span {
                vertical-align: middle;
                display: block;
                width: to(118);
                height: to(110);
                @include wh(118, 36);
                background: url(../../assets/img/sys.png) 0 center no-repeat;
                background-size: to(118) to(36);
                margin-left: to(20);
            }
            i {
                vertical-align: middle;
                display: inline-block;
            }
        }
    }
    .peixunList {
        padding: 0 to(30);
        flex: 1;
        overflow: auto;
        .item {
            width: 100%; // height: to(366);
            border-bottom: to(2) solid #fff;
            position: relative;
            margin-top: to(30);
            padding-bottom: to(20);
            .pic {
                width: 100%;
                height: to(392);
            }
            h2 {
                padding: to(20) 0;
                font-size: $addFontSize4;
                color: #040404;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            p {
                i {
                    vertical-align: middle;
                    @include wh(22, 24);
                    display: inline-block;
                    background: url(../../assets/img/clock.png) 0 center no-repeat;
                    background-size: 100%;
                }
                em {
                    vertical-align: middle;
                }
                color: #696969;
                font-size: $addFontSize5;
                padding-bottom: to(20);
            }
            span {
                font-size: $addFontSize4;
                color: #040404;
                display: block;
                width: to(500);
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .btn {
                @include wh(156, 44);
                position: absolute;
                right: 0;
                bottom: to(30);
                background: url(../../assets/img/peixunBtn.png) 0 center no-repeat;
                background-size: 100%;
                font-size: $addFontSize4;
                color: #fff;
                text-align: center;
                line-height: to(44);
            }
            .on {
                color: #ff5400;
            }
        }
    }
}

</style>
