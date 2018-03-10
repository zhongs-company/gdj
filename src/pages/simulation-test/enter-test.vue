<template>
    <div class="entertest">
        <div class="title">{{examTitle}}</div>
        <!-- <div class="msg">{{examDesc}}</div> -->
        <div class="ks">考试须知：</div>
        <!-- <div class="msg">考试名称：{{examTitle}}</div> -->
        <div class="msg">考试时长：{{duration}}分钟</div>
        <div class="msg">总分：{{totalScore}}分</div>
        <div class="msg">及格分：{{passScore1}}分</div>
        <div class="msg">考试开始时间：{{startTime}}</div>
        <div class="msg">考试结束时间：{{endTime}}</div>
        <div class="msg">允许考试次数：<span class="num">{{allowCount}}次</span></div>
        <!-- <div class="msg" v-if="phase == 'C'"><span class="num">考试已结束了</span></div> -->
        <div class="btn on" @click="start">开始答题</div>
        <div class="ks" style="padding-top:50px;">考试记录：</div>
        
        <div v-for="(item , index) in examUserDetailList" :key="index" class="msg">
            考试时间：{{item.endTime}} <span class="pl20">得分：{{item.score}}</span>
            <span class="pl20 answer-detail-btn" @click="toDetail(item)">答题详情</span>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import * as api from '@/vuex/api';
export default {
    computed: mapState({
        examUserDetailList: state => state.ks.examUserDetailList,
        startTime: state => state.ks.startTime,
        endTime: state => state.ks.endTime,
        phase: state => state.ks.phase,
        passScore1: state => state.ks.passScore1,
        totalScore: state => state.ks.totalScore,
        duration: state => state.ks.duration,
        examTitle: state => state.ks.examTitle,
        examDesc: state => state.ks.examDesc,
        allowCount: state => state.ks.allowCount
    }),
    data() {
        return {

        };
    },
    created() {
        var { examId } = this.$route.params;
        if (examId) {
            this.$store.dispatch("ks_getDetail", { examId });
        }
    },
    methods: {
        start() {

            if (this.phase === 'C') {
                this.$store.commit('MSG_POPUP_SHOW', {
                    value: '本次考试时间已结束，不能作答哦！'
                });
                return;
            }

            this.$store.commit('KS_RESET_DATA');
            var { examId } = this.$route.params;
            this.$router.replace({ name: 'Interface', params: { examId } });
        },
        toDetail(item){
            this.$router.push({ name: 'Lookanswer', params: { detailId: item.detailId } });
        }
    }
};

</script>
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';
.answer-detail-btn{
    text-decoration: underline;
    color:#207bc2;
}
.ks {
    font-size: to(26);
    line-height: to(48);
    font-weight: bold;
}

.pl20 {
    padding-left: to(10);
}

.pb20{
    padding-bottom: to(20);
}

.entertest {
    padding: to(20);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    .title {
        line-height: to(40);
        font-size: to(32);
        color: #040404;
        text-align: center;
        padding-bottom: to(30);
    }
    .msg {
        font-size: to(26);
        line-height: to(40);
        color: #040404;
        padding: to(5) 0;
        .num {
            color: #f0500f;
        }
    }
    .btn {
        @include wh(156, 44);
        background: url(../../assets/img/peixunBtn.png) 0 center no-repeat;
        background-size: 100%;
        font-size: $addFontSize4;
        color: #fff;
        text-align: center;
        line-height: to(44);
        margin: to(40) auto 0;
    }
}

</style>
