<template>
    <div class="body">
        <router-view></router-view>
        <div class="scenario">
            <div class="topPic" v-bind:style="{ backgroundImage:'url('+ voteActivity.coverImage +')' }">
                <div class="jlBtn" @click="showRule" v-show="voteActivity.content"></div>
            </div>
            <div class="seacherBar">
                <input placeholder="请输入搜索内容" v-model="keyword">
                <div class="seach-btn" @click="seach"></div>
            </div>
            <ul class="listBar">
                <li v-for="(item, index) in voteActivityCatList" :key="index" @click="tabs(index, item.catId)">
                    <div class="item" :class="{on:(item.isClick)}"><span>{{ item.catTitle }}</span></div>
                </li>
            </ul>
            <ul class="scenario_main" v-scroll>
                <li v-for="(item, index) in list" :key="index" @click="toDetail(item)">
                    <div class="left"><img :src="item.coverImage"></div>
                    <div class="right">
                        <h2>{{item.objectTitle}}</h2>
                        <p class="p1">{{item.publisher}}</p>
                        <p>{{item.objectSummary}}</p>
                        <div class="zan">
                            <!-- @click="zan(item.objectId, index)" -->
                            <span ><i class="heart"></i>{{item.voteCount}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 活动规则 -->
        <transition name="fade" mode="out-in">
            <div class="rule-box" v-show="ruleIsShow">
                <div class="box-content">
                    <div class="content-title">大赛锦囊</div>
                    <div class="content" v-html="voteActivity.content"></div>
                    <div class="content-close-btn" @click="hideRule">确定</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapState } from "vuex";
import * as utils from '@/lib/utils';
export default {
    data() {
        return {
            ruleIsShow: false,
            isPull: true,
            keyword: ''
        }
    },
    computed: mapState({
        voteActivity: state => state.pxhd.voteActivity,
        voteActivityCatList: state => state.pxhd.voteActivityCatList,
        page: state => state.pxhd.page,
        total: state => state.pxhd.total,
        list: state => state.pxhd.list,
    }),
    created() {
        this.$store.dispatch('pxhd_init', {
            success: () => {
                this.$store.dispatch('pxhd_voteActivityObject');
            }
        });
    },
    mounted() {
        var node = document.querySelector('.scenario_main');
        node.addEventListener('scroll', utils.throttle(() => {

            if (this.page > this.total) {
                console.log('没有更多了！');
                return;
            }

            var scroll_h = node.scrollHeight;
            var view_h = node.offsetHeight;
            var scroll_top = node.scrollTop;

            //整个列表的高度 - ( 滚动的高度 + 盒子的高度 )
            if ((scroll_h - view_h - scroll_top < 200) && this.isPull) {
                this.isPull = false;
                this.$store.dispatch("pxhd_voteActivityObject", {
                    pageNo: this.page,
                    success: () => {
                        this.isPull = true;
                    }
                });
            }
        }), false);
    },
    methods: {
        tabs(index, catId) {
            this.$store.commit('PXHD_GET_CATID', catId);
            this.$store.commit('PXHD_TABS', index);
            this.$store.dispatch('pxhd_voteActivityObject', {
                catId,
                pageNo: 1
            });
        },
        toDetail(item) {
            var {objectId, activityId } = item;
            console.log(item);
            if(objectId && activityId ){
                this.$router.push({ name: 'ActivitiesDetail', params: { objectId:`${objectId}=${activityId}` } })
            }
        },
        zan(objectId, index) {
            this.$store.dispatch('pxhd_voteActivityLog', { objectId, index });
        },

        seach() {
            if (this.keyword.trim()) {
                this.$store.dispatch('pxhd_seach', {
                    keyword: this.keyword.trim(),
                    success: (res) => {
                        this.keyword = '';
                        var { list } = res.data;
                        if (list.length == 0) {
                            this.$store.commit('MSG_POPUP_SHOW', {
                                value: '暂无搜索数据！'
                            });
                        }
                    }
                });
            }
        },
        showRule() {
            this.ruleIsShow = true;
        },
        hideRule() {
            this.ruleIsShow = false;
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';

.rule-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.33);
    display: flex;
    align-items: center;
    justify-content: center;
    .box-content {
        width: to(450);
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: to(10);
        color: #000;
        font-size: to(25);
        line-height: to(36);
    }
    .content-title {
        text-align: center;
        font-size: to(30);
        line-height: to(100);
    }
    .content {
        padding: to(20);
        padding-top: initial;
        word-break: break-all;
        max-height: to(680);
        overflow: auto;
    }
    .content-close-btn {
        border-top: 1px solid #a5aaaa;
        line-height: to(82);
        text-align: center;
        color: #ff5400;
        font-size: to(25);
    }
}


.body {
    width: 100%;
    height: 100%;
}


.scenario {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    display: flex;
    flex-direction: column;
    .topPic {
        width: 100%;
        height: to(275);
        background: url(../../assets/img/competition.jpg) 0 0 no-repeat;
        background-size: 100% 100%;
        position: relative;
        .jlBtn {
            position: absolute;
            right: to(20);
            top: to(20);
            @include wh(120, 49);
            background: url(../../assets/img/jl.png) 0 0 no-repeat;
            background-size: 100%;
        }
    }
    .seacherBar {
        padding: to(15) to(30);
        position: relative;
        input {
            width: 100%;
            height: to(50);
            border-radius: to(25);
            text-align: center;
            color: #404040;
            font-size: $addFontSize5;
            padding: 0 to(80);
        }
    }

    .seacherBar .seach-btn {
        position: absolute;
        @include wh(33*2, 33*2);
        background: url(../../assets/img/search2.png) 0 0 no-repeat;
        background-size: to(33) to(33);
        background-position: center center;
        top: 50%;
        transform: translateY(-50%);
        right: to(50);
    }

    .listBar {
        width: to(750);
        height: to(70);
        margin-bottom: to(30);
        background: #cedeff;
        display: flex;
        overflow: auto;
        li {
            box-flex: 1;
            flex: 1;
            .item {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    display: block;
                    @include wh(160, 52);
                    background: #221d6f;
                    background-size: cover;
                    font-size: $addFontSize3;
                    text-align: center;
                    line-height: to(52);
                    color: #fff;
                    border-radius: to(30);
                    border: to(2) solid #fff;
                }
            }
            .on {
                span {
                    color: #ffd800;
                }
            }
        }
        li:not(:last-child) {
            border-right: 1px solid #fff;
        } // li:nth-child(2) {
        //     border-left: to(2) solid #fff;
        //     border-right: to(2) solid #fff;
        // }
        // li:nth-child(3) {
        //     border-right: to(2) solid #fff;
        // }
    }
    .scenario_main {
        flex: 1;
        li {
            padding: to(30);
            margin-bottom: to(10);
            width: 100%;
            background: #fff;
            padding: pTR(30);
            display: flex;
            .left {
                width: to(265);
                img {
                    width: 100%;
                    height: to(178);
                }
            }
            .right {
                box-flex: 1;
                flex: 1;
                padding-left: to(20);
                h2 {
                    font-size: $addFontSize4;
                    color: #040404;
                    font-weight: bold;
                    line-height: to(35);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; // margin-bottom: to(20);
                    min-height: to(50);
                }
                .p1 {
                    padding-bottom: to(10);
                    font-size: to(28);
                }
                p {

                    color: #545454;
                    font-size: $addFontSize5;
                    line-height: to(32);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
            }
        }
    }
}


.zan {
    font-size: $addFontSize4;
    color: #919191;
    vertical-align: middle;
    text-align: right;
    padding-top: to(10);
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

</style>
