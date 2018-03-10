<template>
    <transition name="left" mode="out-in">
        <div class="interfaceBox">
            <div class="nextBox">
                <div class="evaluationBox">
                    <div class="introduction" v-for="(item, index) in voteSubjectList" :key="index">
                        <!-- 单选 -->
                        <div class="questionBox" v-if="item.voteSubject.subjectType == 'signle'">
                            <div class="questiontitle">{{index+1}}、{{item.voteSubject.subjectTitle}}</div>
                            <ul class="questionitem">
                                <template v-for="(li, ind) in item.itemList">
                                    <li :class="{ on: (li.isSelected == 'Y')}" v-if="li.isCustomerItem == 'N'" @click="signle(index, ind)">
                                        {{li.itemContent}}
                                    </li>
                                    <li :class="{ on: (li.isSelected == 'Y')}" v-if="li.isCustomerItem == 'Y'" @click="signle(index, ind)">
                                        {{li.itemContent}}
                                        <input type="text" class="input" v-model="li.customerText">
                                    </li>
                                    <!-- <li v-if="li.isCustomerItem == 'Y'" :class="{ no: (li.isCustomerItem == 'Y')}">
                                        {{li.itemContent}}
                                        <input type="text" class="input" v-model="li.customerText">
                                    </li> -->
                                </template>
                            </ul>
                        </div>
                        <!-- 多选 -->
                        <div class="questionBox" v-if="item.voteSubject.subjectType == 'multi'">
                            <div class="questiontitle">{{index+1}}、{{item.voteSubject.subjectTitle}}</div>
                            <ul class="questionitem">
                                <template v-for="(li, ind) in item.itemList">
                                    <li :class="{ on: (li.isSelected == 'Y')}" v-if="li.isCustomerItem == 'N'" @click="multi(index, ind)">
                                        {{li.itemContent}}
                                    </li>
                                    <li :class="{ on: (li.isSelected == 'Y')}" v-if="li.isCustomerItem == 'Y'" @click="multi(index, ind)">
                                        {{li.itemContent}}
                                        <input type="text" class="input" v-model="li.customerText">
                                    </li>
                                </template>
                            </ul>
                        </div>
                        <!-- 问答 -->
                        <div class="questionBox" v-if="item.voteSubject.subjectType == 'ask'">
                            <div class="questiontitle">{{index+1}}、{{item.voteSubject.subjectTitle}}</div>
                            <textarea name="" id="" cols="30" rows="10" class="textarea" v-model="item.voteSubject.answerContent"></textarea>
                        </div>
                    </div>
                    <div class="btnlist">
                        <div class="beginBtn" @click="sub">提交</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapState } from "vuex";
import * as utils from '@/lib/utils'

export default {
    computed: mapState({
        voteSubjectList: state => state.pxxq.voteSubjectList,
        isSub: state => state.pxxq.isSub
    }),
    data() {
        return {

        };
    },
    created(voteId) {

        var { voteId, voteTitle } = this.$route.params;

        this.$store.dispatch("pxxq_voteInfo_getDetail", {
            voteId
        });

        utils.setTitle(voteTitle);

    },
    methods: {
        signle(index, ind) {
            this.$store.commit('PXXQ_SIGNLE', { index, ind });
        },

        multi(index, ind) {
            this.$store.commit('PXXQ_MULTI', { index, ind });
        },
        sub() {
            this.$store.commit('PXXQ_SUB');

            //有题目没答
            if (!this.isSub) {
                this.$store.commit('MSG_POPUP_SHOW', {
                    value: '答完题才能提交！'
                });
                return;
            }

            var { voteId } = this.$route.params;

            this.$store.dispatch("pxxq_voteInfo_saveUserAnswer", {
                voteId,
                success: (res) => {
                    if (res.ret == 0) {
                        this.$store.commit('MSG_POPUP_SHOW', {
                            value: '提交成功！'
                        });
                    } else {
                        this.$store.commit('MSG_POPUP_SHOW', {
                            value: res.msg
                        });
                    }

                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 2000)
                }
            });
        }
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';
html {
    background: #e6f4ff;
}

#app {
    height: auto;
}

.interfaceBox {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    padding: 0 to(28);
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    .nextBox {
        .evaluationBox {
            width: 100%;
            height: 100%;
            background: #e6f4ff;
            padding: 0 to(30);
            overflow-x: hidden; // max-height: to(1000);
            overflow-y: scroll;
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
                    height: to(216);
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
            }
            .introduction {
                position: relative; // padding-bottom: to(60);
                .questionBox {
                    padding-top: to(60); // padding-bottom: to(45);
                    .textarea {
                        width: 100%;
                        height: to(200);
                        padding: to(20);
                        font-size: to(28);
                        color: #323232;
                    }
                    .questiontitle {
                        font-size: $addFontSize3;
                        color: #040404;
                        padding-bottom: to(20);
                        line-height: to(48);
                        font-weight: bold;
                    }
                    .questionitem {
                        padding-bottom: to(50);
                        li {
                            padding-left: to(40);
                            color: #484848;
                            font-size: $addFontSize4;
                            padding-bottom: to(20);
                            position: relative;
                            .input {
                                width: to(100);
                            }
                        }
                        .on:after {
                            content: '';
                            position: absolute;
                            background: #eb6100;
                        }
                        li:after {
                            content: '';
                            position: absolute;
                            left: to(5);
                            top: to(0);
                            background: #fff;
                            @include wh(20, 20);
                            border-radius: 50%;
                        }
                        .no:after {
                            @include wh(0, 0);
                        }
                        .no {
                            padding-left: 0;
                        }
                    }
                }
                .text {
                    line-height: to(40);
                    font-size: $addFontSize4;
                }
            }
        }
        .btnlist {
            // position: fixed;
            // left: 0;
            // width: 100%;
            // bottom: to(50);
            // display: flex;
            // justify-content: space-between;
            .beginBtn {
                @include wh(259, 58);
                background: url(../../assets/img/datiBtn.png) 0 0 no-repeat;
                background-size: 100%;
                margin: to(20) auto to(40);
                color: #fff;
                font-size: $addFontSize2;
                text-align: center;
                line-height: to(58);
            }
        }
    }
}

</style>
