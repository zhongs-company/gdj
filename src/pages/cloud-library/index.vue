<template>
    <div class="body">
        <div class="contentBox">
            <div class="title">
                <div class="search-btn" @click="submit">搜索</div>
                <div class="left">
                    <input class="search" placeholder="请输入关键字搜索" v-model="inputValue">
                    <div class="searchLogo"></div>
                </div>
                <div class="right" @click="showTab"><span></span><i>分类</i></div>
            </div>
            <div class="listBox" v-scroll v-pull="scrollObj">
                <transition name="down" mode="out-in">
                    <ul class="species" v-show="isShowTab">
                        <li v-for="(item, index) in classTab" @click="getClassList(item.typeId)" :key="index">{{item.typeName}}</li>
                    </ul>
                </transition>
                <ul class="picBox">
                    <li v-for="(item, index) in list" :key="index">
                        <div class="piclist">
                            <img :src="item.coverImg" @click="toDetailPage(item.courseId)">
                            <p class="text">{{item.courseTitle}}</p>
                            <div class="zan">
                                <span @click="fav(item)"><i class="start"></i>{{item.favoriteCount}}</span>
                                <span @click="zan(item)"><i class="heart"></i>{{item.upCount}}</span>
                            </div>
                        </div>
                    </li>
                    <div class="pull-msg" v-show="page>total">没数据了</div>
                </ul>
            </div>
            <div class="bottom">
                <div class="left" @click="getPageHot
"><i></i>热门课程</div>
                <div class="right" @click="getPageCollect"><i></i>收藏课程</div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import * as api from "@/vuex/api";

import { mapState } from "vuex";

import favZanMixin from "@/mixin/favZanMixin";

export default {
    mixins: [favZanMixin],
    computed: mapState({
        isPull: state => state.yxkck.isPull,
        classTab: state => state.yxkck.classTab,
        list: state => state.yxkck.list,
        page: state => state.yxkck.page,
        total: state => state.yxkck.total
    }),
    data() {
        return {
            req: {
                typeId: "",
                keyword: ""
            },
            inputValue: "",
            isShowTab: false,
            scrollObj: {
                _vue: this
            }
        };
    },
    created() {
        this.$store.commit("LOADER_SHOW");
        this.getElnCourse({ m: "getPage" });
        this.$store.dispatch("yxkck_getSysType");
    },
    beforeDestroy() {
        this.$store.commit("YXKCK_RESET_DATA");
    },
    methods: {
        getClassList(typeId) {
            if (typeId) {
                this.$store.commit("LOADER_SHOW");
                this.req.keyword = "";
                this.req.typeId = typeId;
                this.$store.commit("YXKCK_RESET_DATA");
                this.showTab();
                this.getElnCourse({ m: "getPage", typeId });
            }
        },
        //列表 == getPage
        //分类 == getPage
        //搜索 == searchByKeywordPage
        getElnCourse(req) {
            var obj = {
                pageNo: this.page - 0 + 1,
                m: req.m
            };

            //typeId 分类id
            if (req.typeId) {
                Object.assign(obj, { typeId: req.typeId });
            }

            //搜索
            if (req.keyword) {
                Object.assign(obj, { keyword: req.keyword });
            }

            if (this.page <= this.total) {
                this.$store.dispatch("getElnCourse", obj);
            }
        },

        showTab() {
            if (this.isShowTab) {
                this.isShowTab = false;
            } else {
                this.isShowTab = true;
            }
        },
        submit() {
            if (this.inputValue.trim()) {
                this.$store.commit("LOADER_SHOW");

                this.$store.commit("YXKCK_RESET_DATA");

                this.req.typeId = "";
                this.req.keyword = this.inputValue.trim();

                this.getElnCourse({
                    m: "searchByKeywordPage",
                    keyword: this.inputValue.trim()
                });
                this.inputValue = "";

                return;
            }

            this.$store.commit("MSG_POPUP_SHOW", {
                value: "搜索信息不能为空！"
            });
        },

        getPageHot() {
            this.$router.push({ name: "LibraryHot" });
            // this.$store.dispatch("yxkck_elnCourseGetPageHot");
        },

        getPageCollect() {
            this.$router.push({ name: "LibraryCollect" });
        }
    }
};

</script>
<style lang="scss" scoped>
// .body {
//     width: 100%;
//     height: 100%;
// }
@import "../../scss/_mixins.scss";
.pull-msg {
    height: to(60);
    line-height: to(60);
    text-align: center;
    color: #323232;
    font-size: to(24);
}

.contentBox {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    display: flex;
    flex-direction: column;
    .title {
        height: to(80);
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 to(30);
        .left {
            @include wh(460, 50);

            background: #fff;
            border-radius: to(30);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .searchLogo {
                @include wh(26, 26);
                background: url(../../assets/img/search.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(15);
                position: absolute;
                left: to(20);
                top: 50%;
                transform: translate3d(0, -50%, 0);
            }
            .search {
                height: 100%;
                width: to(360);
                font-size: $addFontSize4; // text-align: center;
            } // .search:focus {
            // text-align: left;
            // } // .search:focus+div {
            //     display: none;
            // }
        }
        .search-btn {
            position: absolute;
            top: 0;
            left: to(500);
            font-size: $addFontSize4;
            color: #323232;
            line-height: to(80);
            width: to(80);
            text-align: center;
        }
        .right {
            font-size: $addFontSize4;
            color: #040404;
            height: 100%;
            line-height: to(80);
            span {
                vertical-align: middle;
                display: inline-block;
                @include wh(38, 30);
                background: url(../../assets/img/list.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(20);
            }
            i {
                vertical-align: middle;
                display: inline-block;
            }
        }
    }
    .listBox {
        background: #fff;
        padding: to(20) to(30) to(100);
        flex: 1;
        height: 100%;
        overflow: auto;
        .species {
            padding: to(40) to(20);
            text-align: center;
            position: fixed;
            top: to(80);
            left: 0;
            width: 100%;
            background-color: #fff;
            overflow: hidden;
            li {
                @include wh(142, 50);
                background: #221d6f;
                border-radius: to(20);
                color: #ffd800;
                font-size: $addFontSize3; // display: inline-block;
                text-align: center;
                line-height: to(50);
                margin-bottom: to(10);
                margin-right: to(15);
                margin-left: to(15);
                float: left;
            }
        }
        .picBox {
            font-size: 0;
            li {
                width: 50%;
                display: inline-block;
                .piclist {
                    width: to(333);
                    margin: 0 auto;
                    padding-bottom: to(30);
                }
                img {
                    @include wh(333, 180); // height: auto;
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
                    display: inline-block;
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
        }
    }
    .bottom {
        position: fixed;
        left: 0;
        width: 100%;
        height: to(85);
        padding: 0 to(70);
        bottom: 0;
        background: #cedeff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $addFontSize3;
        &:after {
            content: '';
            width: 1px;
            height: 100%;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 0;
        }
        .left {
            @include wh(238, 58);
            background: #221d6f;
            border-radius: to(30);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #dedede;
            i {
                @include wh(32, 40);
                background: url(../../assets/img/fire.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(10);
            }
        }
        .right {
            @include wh(238, 58);
            background: #221d6f;
            border-radius: to(30);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #dedede;
            i {
                @include wh(44, 32);
                background: url(../../assets/img/file.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(10);
            }
        }
        .on {
            color: #ffd800;
        }
    }
}

</style>
