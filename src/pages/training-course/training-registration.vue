<template>
    <!-- <transition name="left" mode="out-in"> -->
    <div class="detailBox">
        <div class="title">{{className}}<span></span></div>
        <div class="picBox">
            <img :src="classLogo">
            <!-- <div class="zan">
                <span><i class="start"></i>200</span>
                <span><i class="heart"></i>607</span>
            </div> -->
            <div class="btnlist">
                <div class="beginBtn" :class="{ on:isLeft}" @click="showLeft">课程介绍</div>
                <div class="beginBtn" :class="{ on:isRight}" @click="showRight">课程讨论</div>
            </div>
        </div>
        <!-- 课程介绍 -->
        <div class="introduction" v-show="isLeft" v-scroll>
            <p class="text"><i>开课时间：</i><span>{{beginTime}}</span></p>
            <p class="text"><i>开课地点：</i><span>{{address}}</span></p>
            <p class="text"> <i>注意事项：</i><span>{{memo}}</span></p>
            <p class="text"><i>课程介绍：</i><span v-html="classDesc" id="intro-span"></span></p>
            <!-- <p class="text"><i>课程大纲：</i> <span>{{classDesc}}</span></p>  -->
            <p class="text" style="height:80px"></p> 

        </div>
        <div class="btnlist1" v-show="isLeft">
            <!--  <div v-if="classPhase==='training'" class="beginBtn">培训中</div>
                <div v-if="classPhase==='waitbegin'" class="beginBtn">待开始</div>
                <div v-if="classPhase === 'evaluate'" class="beginBtn" @click="toPxpg">培训评估</div>
                <div v-if="(classPhase === 'enroll' && isApplyed === 'N')" class="beginBtn" @click="pxbm">培训报名</div>
                <div v-if="(classPhase === 'enroll' && isEvaluated === 'Y')" class="beginBtn">已报名</div>
                <div v-if="classPhase === 'course'" class="beginBtn">开课中</div>
                <div v-if="classPhase === 'exam'" class="beginBtn">考试中</div>
                <div v-if="classPhase === 'sign'" class="beginBtn">培训签到</div>
                <div v-if="classPhase === 'complete'" class="beginBtn">已完成</div> -->
            <div v-if="isEvaluated === 'N'" class="beginBtn" @click="toPxpg">培训评估</div>
            <div v-if="isEvaluated === 'Y'" class="beginBtn" @click="toMsg">已评估</div>
        </div>
        <!-- 课程讨论 -->
        <div class="introduction1" v-show="isRight">
            <ul class="scroll-list" v-scroll>
                <li class="discuss" v-for="li in topicList" v-bind:key="li.classId">
                    <div class="left"><img :src="li.headimgurl"></div>
                    <div class="right">
                        <h2>{{decodeURIComponent(li.nickname)}}</h2>
                        <p>{{li.content}}</p>
                    </div>
                </li>
            </ul>
            <div class="inputBat" @click="show">
                <div class="input">说说你的想法…</div>
                <div class="send">发送</div>
                <!-- <div class="inputLogo"><i></i><span>写评论</span></div> -->
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div v-show="isShowPopup">
                <div class="input-box" @click="hide"></div>
                <div class="input-aaa">
                    <textarea placeholder="说说你的想法…" v-model="inputValue" v-on:keyup.enter="submit" class="textarea-text" name="content" cols="30" rows="10"></textarea>
                    <div class="sub-btn" @click="submit">发送</div>
                </div>
            </div>
        </transition>
    </div>
    <!-- </transition> -->
</template>
<script>
import * as utils from '@/lib/utils'
import * as api from '@/vuex/api'

import { mapState } from "vuex";

export default {
    computed: mapState({
        address: state => state.pxb.address,
        classLogo: state => state.pxb.classLogo,
        className: state => state.pxb.className,
        memo: state => state.pxb.memo,
        classDesc: state => state.pxb.classDesc,
        beginTime: state => state.pxb.beginTime,

        isApplyed: state => state.pxb.isApplyed,
        isEvaluated: state => state.pxb.isEvaluated,
        classPhase: state => state.pxb.classPhase,
        groupId: state => state.pxb.groupId,
        topicList: state => state.pxb.topicList,
        groupPageNo: state => state.pxb.groupPageNo,
        groupPageTotal: state => state.pxb.groupPageTotal
    }),
    data() {
        return {
            isShowPopup: false,
            isLeft: true,
            isRight: false,
            inputValue: '',
            isPull: true
        };
    },
    created() {
        var { classId } = this.$route.params;
        if (classId) {
            this.$store.dispatch('pxb_getDetail', {
                classId,
                cb: () => {
                    setTimeout(() => {
                        $('#intro-span img').css('max-width', '220px')
                        $('#intro-span video').css('max-width', '220px')
                    }, 0)
                }
            })
        }
    },
    mounted() {

    },
    methods: {
        showLeft() {
            this.isLeft = true;
            this.isRight = false;

            //document.querySelector('.scroll-list').removeEventListener('scroll');

        },
        showRight() {


            this.isRight = true;
            this.isLeft = false;
            this.$store.commit('PXB_RESET_TOPIC_LIST');
            this.$store.dispatch('pxb_getTopicList', {
                groupId: this.groupId,
                pageNo: this.groupPageNo,
                cb: () => {
                    var node = document.querySelector('.scroll-list');
                    node.addEventListener('scroll', utils.throttle(() => {
                        if (this.groupPageNo > this.groupPageTotal) {
                            return;
                        }
                        var scroll_h = node.scrollHeight;
                        var view_h = node.offsetHeight;
                        var scroll_top = node.scrollTop;

                        //整个列表的高度 - ( 滚动的高度 + 盒子的高度 )
                        if ((scroll_h - view_h - scroll_top < 200) && this.isPull) {
                            this.isPull = true;
                            this.$store.dispatch('pxb_getTopicList', {
                                groupId: this.groupId,
                                pageNo: this.groupPageNo
                            });
                        }
                    }), false);
                }
            });

        },
        submit() {
            this.hide();
            var { inputValue } = this;
            if (!inputValue.trim()) {
                this.$store.commit('MSG_POPUP_SHOW', {
                    value: '评论不能为空！'
                });
                return;
            }
            var { headimgurl, nickname } = utils.userInfo;

            // console.log(utils.userInfo)

            this.$store.dispatch('pxb_pushTopic', {
                groupId: this.groupId,
                content: inputValue.trim(),
                headimgurl: headimgurl || 'http://1251097942.cdn.myqcloud.com/1251097942/demos/photo/photo2.jpg',
                nickname: nickname || '匿名',
                cb: (res) => {
                    this.inputValue = '';
                    this.$store.commit('PXB_PUSH_TOPIC_LIST', res);
                    document.querySelector('.scroll-list').scrollTop = 0;
                    this.$store.commit('MSG_POPUP_SHOW', {
                        value: '评论成功！'
                    });
                }
            });

        },
        pxbm() {
            var { classId } = this.$route.params;

            api.elnClassUser({ classId }, (res) => {
                if (res.ret == 0) {
                    this.$store.commit('MSG_POPUP_SHOW', {
                        value: '报名成功！'
                    });
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
        toPxpg() {
            var { classId } = this.$route.params;
            if (classId) {
                this.$router.push({ path: `/trainingCourse/evaluation/${classId}` })
            }
        },
        show() {
            this.isShowPopup = true;
        },
        hide() {
            this.isShowPopup = false;
        },
        toMsg() {
            this.$store.commit('MSG_POPUP_SHOW', {
                value: '已评估!'
            });
        }
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';
.input-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9;
}

.input-aaa {
    width: 100%;
    background-color: #f4f4f4;
    padding-top: to(32);
    padding-bottom: to(32);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .textarea-text {
        width: to(684);
        height: to(187);
        border-radius: to(10);
        border: 1px solid #e4e4e4;
        margin: 0 auto to(32);
        display: block;
        padding: to(15);
        line-height: to(32);
        font-size: to(28);
        color: #323232;
    }
    .sub-btn {
        margin-left: to(520);
        text-align: center;
        line-height: to(60); // padding: 0 to(15);
        // font-size: to(26);
        // color: #fff;
        // background-color: #12b053;
        // border-radius: to(5);
        // display: block;
        @include wh(156, 60);
        background: url(../../assets/img/peixunBtn.png) 0 center no-repeat;
        background-size: 100%;
        font-size: $addFontSize4;
        color: #fff;
        text-align: center;
    }
}

.detailBox {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    padding: 0 to(30);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    .title {
        color: #040404;
        font-size: $addFontSize1;
        line-height: to(45);
        padding: to(40) 0;
        text-align: center;
        font-weight: bold;
        word-break: break-all;
    }
    .picBox {
        padding-bottom: to(30);
        img {
            width: 100%;
            height: to(392);
            margin-bottom: to(30);
        }
        .text {
            color: #040404;
            font-size: $addFontSize4;
            padding: to(20) 0;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .btnlist {
            display: flex;
            justify-content: space-between;
            .beginBtn {
                @include wh(156, 44);
                background: url(../../assets/img/litterBtn.png) 0 0 no-repeat;
                background-size: 100%;
                margin: to(10) auto;
                color: #fff;
                font-size: $addFontSize2;
                text-align: center;
                line-height: to(45);
            }

            .on {
                color: #ff5400;
            }
        }
    }
    .introduction {
        position: relative;
        // padding-bottom: to(180);
        max-height: to(600);
        overflow-y: scroll;
        .tips {
            top: 0;
            position: absolute;
            left: to(-100);
            @include wh(245, 45);
            background: url(../../assets/img/tips.png) 0 0 no-repeat;
            background-size: 100%;
            line-height: to(45);
            color: #fff;
            font-size: $addFontSize4;
            padding-left: to(90);
        }
        .text {
            line-height: to(40);
            font-size: $addFontSize4;
            display: flex;
            i {
                width: to(150);
            }
            span {
                box-flex: 1;
                flex: 1;
            }
        }
    }
    .btnlist1 {
        position: fixed;
        left: 0;
        width: 100%;
        bottom: to(10);
        display: flex;
        justify-content: space-between;
        background-color: #e6f4ff;

        .beginBtn {
            @include wh(259, 58);
            background: url(../../assets/img/datiBtn.png) 0 0 no-repeat;
            background-size: 100%;
            margin: to(50) auto to(50);
            color: #fff;
            font-size: $addFontSize2;
            text-align: center;
            line-height: to(58);
        }
        .beginBtn:after {
            content: '';
            width: 100%;
            height: 70%;
            background-color: #fff;
            position: absolute;
            left: 0;
            bottom: -10%;
            z-index: -1;
            background-color: #e6f4ff;
        }
    }
}

.zan {
    font-size: $addFontSize4;
    color: #919191;
    vertical-align: middle;
    text-align: right;
    span {
        display: inline-block;
        width: to(100);
    }
    .start {
        display: inline-block;
        @include wh(24, 23);
        background: url(../../assets/img/start.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(10);
    }
    .heart {
        display: inline-block;
        @include wh(24, 23);
        background: url(../../assets/img/start.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(10);
    }
}

.introduction1 {
    // padding-bottom:to(88);
    // &:after {
    //     content: '';
    //     width: 100%;
    //     height: to(88);
    //     background-color: #fff;
    //     position: absolute;
    //     left: 0;
    //     bottom: 0%;
    //     background-color: #e6f4ff;
    // }
    ul {
        position: relative;
        max-height: to(600);
        overflow-y: scroll;
        border-top: to(2) solid #fff;
        padding-bottom:to(50);
        .discuss {
            display: flex;
            height: to(150);
            border-bottom: to(2) solid #fff;
            align-items: center;
            .left {
                width: to(120);
                img {
                    width: to(100);
                    height: to(100);
                    border-radius: 50%;
                }
            }
            .right {
                box-flex: 1;
                flex: 1;
                h2 {
                    color: #000000;
                    font-size: $addFontSize4;
                    margin-bottom: to(10);
                    font-weight: bold;
                    width: to(400);
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                p {
                    color: #484848;
                    font-size: $addFontSize5;
                    line-height: to(30);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    width: to(500);
                }
            }
        }
    }
    .inputBat {
        position: fixed;
        left: 0;
        bottom: 0;
        left: 50%;
        z-index: 2;
        width: 100%;
        -webkit-transform: translateX(-50%);
        display: flex;
        height: to(88);
        background-color: #fff;
        .input {
            width: to(620);
            height: 100%;
            background: transparent; // border-radius: to(25);
            border: to(2) solid rgb(230, 244, 255);
            padding: 0 to(40);
            font-size: $addFontSize4;
            line-height: to(88);
        }
        .send {
            flex: 1;
            font-size: to(26);
            color: #323232;
            text-align: center;
            line-height: to(88);
        } // input:focus+div {
        //     display: none;
        // }
        // .inputLogo {
        //     position: absolute;
        //     left: 0;
        //     top: to(20);
        //     color: #a7a7a7;
        //     font-size: $addFontSize5;
        //     vertical-align: middle;
        //     width: 100%;
        //     height: 100%;
        //     text-align: center;
        //     line-height: to(60);
        //     pointer-events: none;
        //     i {
        //         display: inline-block;
        //         vertical-align: middle;
        //         @include wh(27, 26);
        //         background: url(../../assets/img/inputLogo.png) 0 0 no-repeat;
        //         background-size: 100%;
        //         margin-right: to(10);
        //     }
        //     span {
        //         display: inline-block;
        //         vertical-align: middle;
        //     }
        // }
    }
}

</style>
