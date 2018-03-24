<template>
    <!-- <transition name="left" mode="out-in"> -->
    <div class="center-page">
        <div class="user-header">
            <img :src="headimgurl" alt="">
            <div class="user-name">姓名：{{nickname}}</div>
            <div class="user-info">
                <span>部门：{{orgName}}</span>
                <span>工号：{{workId}}</span>
            </div>
        </div>
        <div class="total_count">
            <li class="total_course_count">已参加培训课程：{{ centerList.length }}门</li>
            <!-- <li class="total_score_count">总课时：56学时</li> -->
        </div>
        <div class="page-list" v-for="(item, index) in centerList" :key="index">
            <div class="list-title">{{item.className}}</div>
            <div class="list-item" @click="toPxb(item)">
               <!--  <div class="list-span iconfont icon-monikaoshi">{{item.isSigned == 'Y' ? '已签到' :'未签到'}}</div>
                <div class="list-span iconfont icon-kecheng">{{item.isEvaluated == 'Y' ?'已评估':'已评估'}}</div>
                <div class="list-span iconfont icon-kecheng">{{item.isExamed == 'Y' ?'已考试':'未考试'}}</div> -->
               

                <div class="list-span iconfont icon-monikaoshi">
                    <span v-if="item.isSigned=='Y'">已签到</span>
                    <span v-if="item.isSigned=='N'" style="color:#ec7a3b">未签到</span>
                </div>
                <div class="list-span iconfont icon-kecheng">
                    <span v-if="item.isEvaluated=='Y'">已评估</span>
                    <span v-if="item.isEvaluated=='N'" style="color:#ec7a3b">未评估</span>
                </div>
                <div class="list-span iconfont icon-kecheng">
                    <span v-if="item.isExamed=='Y'">已考试</span>
                    <span v-if="item.isExamed=='N'" style="color:#ec7a3b">未考试</span>
                </div>
            </div>
            <!-- <div class="list-lable">0课时</div> -->
        </div>
    </div>
    <!-- </transition> -->
</template>
<script>
import { mapState } from "vuex";
import * as api from "@/vuex/api";

export default {
    computed: mapState({
        centerList: state => state.pxb.centerList
    }),
    data() {
        return {
            nickname: '',
            headimgurl: '',
            workId: '',
            orgName: ''
        };
    },
    created() {
        this.$store.dispatch("center_getMyClassPage");
        api.get_user_info({
            success: (res) => {
                let { data } = res;
                if (data) {
                    let { nickname, headimgurl, workId, orgName } = data.frontUser;
                    this.nickname = nickname
                    this.headimgurl = headimgurl
                    this.workId = workId
                    this.orgName = orgName
                }
            }
        })
    },
    methods: {
        toPxb(item) {
            let { classId } = item;
            if (classId) {
                this.$router.push({ path: `/trainingCourse/registration/${classId}` });
            }
        }
    }
};

</script>
<style lang="scss">
@import "../scss/_mixins.scss";
@import "../scss/iconfont.scss";
.user-header {
    position: relative;
    background-color: #fff;
    padding: to(20);
    padding-left: to(150);
    margin-bottom: to(20);
    img {
        display: block;
        width: to(100);
        height: to(100);
        border-radius: 50%;
        position: absolute;
        left: to(20);
        top: to(20);
    }
    .user-name {
        font-size: to(26);
        color: #323232;
        line-height: to(38);
    }
    .user-info {
        span {
            display: inline-block;
            padding: to(8) to(12);
            background-color: #ec7a3b;
            font-size: to(26);
            border-radius: to(15);
            color: #fff;
        }
    }
}

.center-page {
    height: 100%;
    overflow: auto;
    background-color: #f5f5f5;
    .total_count {
        padding: 0 to(20);
        line-height: to(80);
        height: to(80);
        font-size: to(30);
        color: #323232;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: to(20);
        background-color: #fff;
    }
    .page-list {
        margin-bottom: to(20);
        background-color: #fff;
        padding: to(20) to(20);
        position: relative;
        .list-title {
            font-size: to(28);
            color: #323232;
            height: to(42);
            line-height: to(42);
            font-weight: bold;
        }
        .list-item {
            display: flex;
            padding: to(20) 0 to(10);
            .list-span {
                font-size: to(28);
                color: #323232;
                line-height: to(32);
                height: to(32);
                padding-right: to(40);
                &::before {
                    margin-right: to(5);
                }
            }
        }
        .list-lable {
            position: absolute;
            right: to(20);
            top: to(8);
            font-size: to(28);
            color: #323232;
            height: to(42);
            line-height: to(42);
        }
    }
}

</style>
