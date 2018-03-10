<template>
    <transition name="left" mode="out-in">
        <div class="detailBox">
            <div class="title">{{detail.articleTitle}}</div>
            <div class="sub-title">{{detail.tags}}</div>
            <div class="picBox">
                <img :src="detail.pic">
                <div class="zan">
                    <!-- <span><i class="start"></i>200</span> -->
                    <span><i class="heart"></i>{{detail.upCount}}</span>
                </div>
            </div>
            <div class="introduction">
                <p class="text" v-html="detail.content"> </p>
            </div>
        </div>
    </transition>
</template>
<script>

import { mapState } from "vuex";

import * as utils from '@/lib/utils';

export default {
    computed: mapState({
        detail: state => state.pxyf.detail
    }),
    data() {
        return {};
    },
    created() {
        var { articleId, title } = this.$route.params;

        utils.setTitle(title);

        this.$store.dispatch('pxyf_getDetail', articleId)
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';
.detailBox {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    padding: 0 to(30);
    overflow-x: hidden;
    position: absolute;
    left:0;
    top:0;
    z-index: 8;
    .title {
        color: #040404;
        font-size: to(32);
        line-height: to(42);
        padding: to(20) to(20) 0 to(20);
        font-weight: bold;
        word-break: break-all;
    }
    .sub-title{
        font-size: to(18);
        line-height: to(24);
        color:#ff5400;
        padding-bottom:to(20);
    }
    .picBox {
        padding-bottom: to(30);
        img {
            width: 100%;
            height: auto;
            // max-height: to(300);
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
                background: url(../../assets/img/heart.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(10);
            }
        }
    }
    .introduction {
        position: relative;
        padding-top: to(20);
        padding-bottom: to(60);
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
        }
    }
}

</style>
