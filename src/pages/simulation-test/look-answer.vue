<template>
    <div class="interfaceBox">
        <div class="nextBox">
            <div class="evaluationBox">
                <div class="title">{{examTitle}}</div>
                <div class="introduction" v-for="(currentExamItem, index) in allAnswer" >
                    <div class="questionBox" v-if="currentExamItem.itemType == 'signle'">
                        <div class="questiontitle">{{index+1}}、{{currentExamItem.itemTitle}}（单选）</div>
                        <ul class="questionitem">
                            <li :class="{ on: item.isSelect }" v-for="(item,index) in currentExamItem.optionList" :key="index">{{ index | abc(index) }}、{{item.option}}</li>
                        </ul>
                    </div>
                    <div class="questionBox" v-if="currentExamItem.itemType == 'multi'">
                        <div class="questiontitle">{{index+1}}、{{currentExamItem.itemTitle}}（多选）</div>
                        <ul class="questionitem">
                            <li :class="{ on:item.isSelect }" v-for="(item,index) in currentExamItem.optionList">{{ index | abc(index) }}、{{item.option}}</li>
                        </ul>
                    </div>
                    <div class="questionBox" v-if="currentExamItem.itemType == 'judge'">
                        <div class="questiontitle">{{index+1}}、{{currentExamItem.itemTitle}}（判断）</div>
                        <ul class="questionitem">
                            <li :class="{ on:item.isSelect }" v-for="(item,index) in currentExamItem.optionList">{{ index | abc(index) }}、{{item.option}}</li>
                        </ul>
                    </div>
                    <div class="questionBox" v-if="currentExamItem.itemType == 'ask' || currentExamItem.itemType == 'blank'">
                        <div class="questiontitle">{{index+1}}、{{currentExamItem.itemTitle}}（问答）</div>
                        <textarea v-model="currentExamItem.userAnswer" name="ask" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div class="answer">正确答案：{{currentExamItem.correctAnswer}}</div>
                    <div class="answer right" v-if="currentExamItem.isCorrect== 'Y'">回答：√</div>
                    <div class="answer error" v-if="currentExamItem.isCorrect== 'N'">回答：×</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";


export default {
    computed: mapState({
        allAnswer: state => state.ks.allAnswer,
        examTitle: state => state.ks.examTitle
    }),
    created() {

        var { detailId } = this.$route.params;

        this.$store.dispatch("ks_allAnswer", { detailId });
    },
    filters: {
        abc: function(n) {
            var digit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            return digit[n];
        }
    }
}

</script>
<style lang="scss" scope>
@import '../../scss/_mixins.scss';

.interfaceBox {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    padding: 0 to(28);
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    .datiBox {
        .datiTitle {
            text-align: center;
            padding: to(30) 0;
            color: #040404;
            font-size: $addFontSize1;
        }
        .content {
            color: #292929;
            font-size: $addFontSize4;
            line-height: to(40);
            padding-bottom: to(40);
        }
        .tips {
            color: #292929;
            font-size: $addFontSize4;
            padding-bottom: to(60);
            border-bottom: solid #fff to(2);
            i {
                color: #f0500f;
            }
        }
        .beginBtn {
            @include wh(259, 58);
            background: url(../../assets/img/datiBtn.png) 0 0 no-repeat;
            background-size: 100%;
            margin: to(85) auto to(50);
            color: #fff;
            font-size: $addFontSize2;
            text-align: center;
            line-height: to(58);
        }
    }
    .recodeBox {
        .recodeTitle {
            font-size: $addFontSize4;
            color: #292929;
            display: inline-block;
            height: to(60);
            line-height: to(60);
            border-bottom: to(2) solid #7d7d7d;
        }
        .recodeTitle1 {
            font-size: $addFontSize4;
            color: #292929;
            padding: to(50) 0 to(15);
        }
        .testTime {
            font-size: $addFontSize5;
            color: #606060;
        }
        .timu {
            padding-top: to(50);
            font-size: $addFontSize4;
            color: #292929;
            .timutitle {
                font-size: $addFontSize5;
                color: #606060;
                padding-bottom: to(20);
            }
            .timuitem {
                font-size: $addFontSize5;
                color: #606060;
                line-height: to(40);
                padding-bottom: to(20);
            }
        }
        .daan {
            font-size: $addFontSize5;
            color: #606060;
            line-height: to(40);
            padding-bottom: to(20);
        }
        .jiexi {
            font-size: $addFontSize5;
            color: #606060;
            line-height: to(40);
        }
    }
    .nextBox {
        .evaluationBox {
            width: 100%;
            height: 100%;
            background: #e6f4ff;
            padding: 0 to(30); // overflow-x: hidden;
            // max-height: to(700);
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
                position: relative;
                padding-bottom: to(60);
                .questionBox {
                    padding-bottom: to(45);
                    .questiontitle {
                        font-size: $addFontSize3;
                        color: #040404;
                        padding-bottom: to(20);
                        line-height: to(48);
                    }
                    .questionitem {
                        li {
                            padding-left: to(40);
                            color: #484848;
                            font-size: $addFontSize4;
                            padding-bottom: to(40);
                            position: relative;
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
                    }
                }
                .text {
                    line-height: to(40);
                    font-size: $addFontSize4;
                }
            }
        }
        .btnlist {
            position: fixed;
            left: 0;
            width: 100%;
            bottom: to(50);
            display: flex;
            justify-content: space-between;
            .beginBtn {
                @include wh(259, 58);
                background: url(../../assets/img/datiBtn.png) 0 0 no-repeat;
                background-size: 100%;
                margin: to(85) auto to(50);
                color: #fff;
                font-size: $addFontSize2;
                text-align: center;
                line-height: to(58);
            }
        }
    }
}

.endPop {
    @include wh(671, 476);
    background: url(../../assets/img/endBox.jpg) 0 0 no-repeat;
    background-size: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    box-shadow: 0 0 to(20) rgba(0, 0, 0, 0.2);
    padding: 0 to(70);
    .endTitel {
        height: to(170);
        line-height: to(170);
        color: #000000;
        font-size: $addFontSize1;
        text-align: center;
        font-size: $addFontSize1;
    }
    .points {
        text-align: center;
        color: #000000;
        i {
            color: #ff4e00;
        }
    }
    .btnlist {
        position: fixed;
        left: 0;
        width: 100%;
        bottom: to(50);
        display: flex;
        justify-content: space-between;
        .beginBtn {
            @include wh(259, 58);
            background: url(../../assets/img/endBtn.png) 0 0 no-repeat;
            background-size: 100%;
            margin: to(85) auto to(50);
            color: #000;
            font-size: $addFontSize2;
            text-align: center;
            line-height: to(58);
        }
    }
}
.introduction {
    .answer {
        font-size: to(24);
        color: red;
        line-height: to(36);
    }
    .right {
        color: #323232;
    }
    .error {
        color: #323232;
    }
}

</style>
