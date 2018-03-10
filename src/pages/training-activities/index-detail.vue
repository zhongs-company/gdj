<template>
    <transition name="left" mode="out-in">
        <div class="detailBox" v-scroll>
            <div class="title">{{ voteActivityObject.objectTitle }}</div>
            <div class="picBox">
                <!-- 图片 -->
                <img v-if="voteActivityObject.contentType == 'image'" class="type" :src="voteActivityObject.fileUrl | imgsrc">
                <!-- 视频 -->
                <video x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline playsinline="true" v-if="voteActivityObject.contentType == 'video'" :src="voteActivityObject.fileUrl | imgsrc" class="type" controls="controls" style="height:200px; background-color:#000;"></video>
                <!-- 语音 -->
                <div v-if="voteActivityObject.contentType == 'audio'" style="position:relative;">
                    <img class="type" :src="voteActivityObject.coverImage | imgsrc">
                    <audio id="audio" :src="voteActivityObject.fileUrl | imgsrc"></audio>
                    <span v-if="isShowAudioBtn" class="btn play" @click="play"></span>
                    <span v-if="!isShowAudioBtn" class="btn pause" @click="pause"></span>
                </div>
                <!-- 链接 -->
                <a v-if="voteActivityObject.contentType == 'link'" :href="voteActivityObject.linkUrl">
                    <img class="type" :src="voteActivityObject.coverImg | imgsrc">
                </a>
                <!-- 文本 -->
                <div v-if="voteActivityObject.contentType == 'html'" class="type">
                    <img class="type" :src="voteActivityObject.coverImg | imgsrc">
                </div>
                <!--  <div class="zan">
                    <span style="line-height:40px;" @click="fav(voteActivityObject.courseId)">
                        <i class="start" ></i>{{voteActivityObject.favoriteCount}}
                    </span>
                    <span style="line-height:40px;" @click="zan(voteActivityObject.courseId)">
                        <i class="heart" ></i>{{voteActivityObject.upCount}}
                    </span>
                </div> -->
            </div>
            <div class="introduction">
                <div class="tips">课程介绍</div>
                <p class="text" v-html="voteActivityObject.content"></p>
                <div class="toupiao" @click="toupiao" v-show="myVoteCountToday == 0">投票</div>
            </div>
        </div>
    </transition>
</template>
<script>
import * as config from "@/lib/config";

import * as api from "@/vuex/api";

import { mapState } from "vuex";

export default {
    computed: mapState({
        voteActivityObject: state => state.pxhd.voteActivityObject,
        myVoteCountToday: state => state.pxhd.myVoteCountToday,
    }),
    data() {
        return {
            isShowAudioBtn: true
        };
    },
    created() {
        var { objectId } = this.$route.params;

        this.$store.dispatch("pxhd_voteActivityObject_detail", {
            objectId: objectId.split('=')[0]
        });
    },
    methods: {
        toupiao() {
            var { objectId } = this.$route.params;
            if (objectId) {
                this.$store.dispatch('pxhd_voteActivityLog', { 
                    objectId: objectId.split('=')[0], 
                    activityId: objectId.split('=')[1]
                });
            } else {
                alert('投票失败')
            }
        },
        // zan(courseId) {
        //     if(this.detail.isThumb === 'N'){
        //         this.$store.dispatch("yxkck_zan", courseId);
        //         this.$store.commit('YXKCK_DETAIL_UPDATE_ZAN');
        //         return;
        //     } 

        //     if(this.detail.isThumb === 'Y'){
        //         this.$store.dispatch("yxkck_zan_cancel", courseId);
        //         this.$store.commit('YXKCK_DETAIL_UPDATE_ZAN_REDUCE');
        //         return;
        //     }
        // },
        // fav(courseId) {

        //     if(this.detail.isFavorite === 'N'){
        //         this.$store.dispatch("yxkck_elnCourseFavorite", courseId);
        //         this.$store.commit('YXKCK_DETAIL_SC');
        //         return;
        //     } 

        //     if(this.detail.isFavorite === 'Y'){
        //         this.$store.dispatch("yxkck_elnCourseFavoriteCancel", courseId);
        //         this.$store.commit('YXKCK_DETAIL_SC_REDUCE');
        //         return;
        //     }
        // },
        play() {
            $('#audio')[0].play();
            this.isShowAudioBtn = !this.isShowAudioBtn;
        },
        pause() {
            this.isShowAudioBtn = !this.isShowAudioBtn;
            $('#audio')[0].pause();
        }
    },
    filters: {
        imgsrc: function(src) {
            if (src) {
                return `${config.cdn_img_src}${src}`
            }
        }
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';
.detailBox {
    background: #e6f4ff;
    padding: 0 to(30); // overflow-x: hidden;
    overflow: auto;
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
    z-index: 5;
    .title {
        color: #040404;
        font-size: $addFontSize1;
        line-height: to(45);
        padding: to(20) 0 0;
        text-align: center;
        font-weight: bold;
        word-break: break-all;
    }
    .picBox {
        padding-bottom: to(30);
        padding-top: to(30);
        position: relative;
        .btn {
            position: absolute;
            width: to(48*2);
            height: to(48*2);
            top: 50%;
            left: 50%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
            transform: translate3d(-50%, -50%, 0);
        }
        .pause {
            background-image: url(../../assets/img/play.png);
        }
        .play {
            background-image: url(../../assets/img/pause.png);
        }
        .type {
            width: 100%; // max-height: to(216*2);
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
                max-width: to(260);
                padding-left: to(50);
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
                @include wh(24, 21);
                background: url(../../assets/img/heart.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(10);
            }
        }
    }
    .introduction {
        position: relative;
        padding-top: to(60);
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
        .toupiao {
            height: to(88);
            background-color: #221d6f;
            text-align: center;
            line-height: to(88);
            font-size: to(32);
            color: #fff;
            margin-top: to(15);
        }
    }
}

</style>
