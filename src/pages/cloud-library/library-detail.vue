<template>
    <transition name="left" mode="out-in">
        <div class="detailBox">
            <!-- <div class="title">你好，我是标题</div> -->
            <div class="picBox">
                <img v-if="detail.elnCourse.contentType == 'image'" class="type" :src="detail.commonAttachmentList[0].filePath | imgsrc">
               
                <video x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline playsinline="true" v-if="detail.elnCourse.contentType == 'video'" :src="detail.commonAttachmentList[0].filePath | imgsrc" class="type" controls="controls" style="height:200px; background-color:#000;"></video>

                <audio v-if="detail.elnCourse.contentType == 'audio'" :src="detail.commonAttachmentList[0].filePath | imgsrc"></audio>

                <a v-if="detail.elnCourse.contentType == 'link'" :href="detail.commonAttachmentList[0].filePath | imgsrc">链接</a>

                <div v-if="detail.elnCourse.contentType == 'html'" class="type">
                    <div v-html="detail.commonAttachmentList[0].filePath | imgsrc"></div>
                </div>

                <div class="zan">
                    <span style="line-height:40px;" @click="zan(detail.elnCourse.courseId)"><i class="start" ></i>{{detail.elnCourse.upCount}}</span>
                    <!-- <span><i class="heart"></i>{{detail.elnCourse.studyCount}}</span> -->
                </div>

            </div>
            <div class="introduction">
                <div class="tips">课程介绍</div>
                <p class="text" v-html="detail.elnTeacher.teacherDesc"></p>
                <p class="text" v-html="detail.elnCourse.courseDesc"></p>
            </div>
        </div>
    </transition>
</template>
<script>
import * as config from "@/lib/config";
import { mapState } from "vuex";

export default {
    computed: mapState({
        detail: state => state.yxkck.detail
    }),
    data() {
        return {};
    },
    created() {
        var { courseId } = this.$route.params;
        this.$store.dispatch("yxkck_getDetail", {
            courseId,
            m: 'getDetail'
        });
    },
    methods: {
        zan(courseId) {
            if (this.detail.isThumb == 'N' && courseId) {
                this.$store.dispatch("yxkck_zan", courseId);
                this.$store.commit('YXKCK_DETAIL_UPDATE_ZAN');
            } else {
                this.$store.commit('MSG_POPUP_SHOW', {
                    value: '您已经点赞了！'
                });
            }
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
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    padding: 0 to(30);
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
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
        padding-top: to(30);
        .type {
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
    }
}

</style>
