<template>
    <div class="body">
        <router-view></router-view>
        <div class="scenario">
            <ul class="listBar">
                <!-- <li>
                    <div class="item on"><span><i class="icon1"></i>安全管理</span></div>
                </li> -->
                <li v-for="(t,index) in title" :key="index">
                    <div @click="switchTitle(t.articleType, index)" class="item" :class="{on:t.on}">
                        <span><i :class="t.clas"></i>{{ t.typeName }}</span>
                    </div>
                </li>
            </ul>
            <div class="seacherBar">
                <input v-model="inputValue" placeholder="请输入搜索内容">
                <div class="seach" @click="seach">搜索</div>
            </div>
            <ul class="scenario_main" v-scroll>
                <!--   <li>
                    <div class="left"><img src="../../assets/img/pic.png"></div>
                    <div class="right">
                        <h2>请输入标题名称请输入标题名称 请输入标题名称</h2>
                        <p>课程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容</p>
                        <div class="zan">
                            <span><i class="heart"></i>607</span>
                        </div>
                    </div>@click="zan(li.articleId, index)"
                </li> -->
                <li v-for="(li, index) in list" :key="index" @click="toDetail(li.articleId)">
                    <div class="left"><img :src="li.pic"></div>
                    <div class="right">
                        <h2>{{li.articleTitle}}</h2>
                        <p>{{li.articleTitleSub}}</p>
                        <div class="zan">
                            <span class="icon">{{li.viewCount}}</span>
                            <span class="tag">{{ li.articleTypeName }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import * as utils from '@/lib/utils'

export default {
    data() {
        return {
            inputValue: '',
            isPull: true,
            page: 1,
            pageSeach: 1,
            isSeach: false
        }
    },
    computed: mapState({
        title: state => state.pxyf.title,
        list: state => state.pxyf.list,
        total: state => state.pxyf.total,
        articleType: state => state.pxyf.articleType,
    }),
    created() {
        this.$store.commit('LOADER_SHOW');
        this.$store.dispatch('pxbyf_get_title', {
            cb: () => {
                this.$store.commit('LOADER_HIDE');
            }
        })
    },
    mounted() {
        var node = document.querySelector('.scenario_main');
        node.addEventListener('scroll', utils.throttle(() => {

            if (this.page >= this.total) {
                return;
            }

            var scroll_h = node.scrollHeight;
            var view_h = node.offsetHeight;
            var scroll_top = node.scrollTop;

            //整个列表的高度 - ( 滚动的高度 + 盒子的高度 )
            if ((scroll_h - view_h - scroll_top < 200) && this.isPull) {
                this.isPull = false;
                this.page += 1;
                if (this.isSeach) {
                    this.seach(this.page);
                } else {
                    this.$store.dispatch("pxbyf_get_list", {
                        articleType: this.articleType,
                        pageNo: this.page,
                        cb: () => {
                            this.isPull = true;
                        }
                    });
                }
            }
        }), false);
    },
    methods: {
        switchTitle(articleType, index) {
            this.isSeach = false;
            this.$store.commit('LOADER_SHOW');

            this.page = 1;
            this.$store.commit('PXBYF_RESET_LIST', { articleType, index });
            this.$store.dispatch("pxbyf_get_list", {
                articleType: articleType,
                pageNo: this.page,
                cb: () => {
                    this.isPull = true;
                    this.$store.commit('LOADER_HIDE');
                }
            });
        },
        zan(articleId, index) {
            this.$store.dispatch("pxyf_saveThumbArticle", {
                articleId: articleId,
                index,
                cb: (res) => {
                    if (res.ret == 0) {
                        this.$store.commit('PXBYF_LIST_ZAN', index);
                        this.$store.commit('MSG_POPUP_SHOW', {
                            value: '点赞成功！'
                        });
                    } else {
                        this.$store.commit('MSG_POPUP_SHOW', {
                            value: res.msg
                        });
                    }
                }
            })
        },
        seach(page) {

            this.isSeach = true;

            if (this.inputValue.trim()) {
                if (page) {
                    this.page = page;
                } else {
                    this.page = 1;
                }
                this.$store.commit('LOADER_SHOW');
                this.$store.commit('PXBYF_RESET_LIST', {});

                this.$store.dispatch('pxyf_searchPage', {
                    keyword: this.inputValue.trim(),
                    pageNo: 1,
                    cb: (res) => {
                        var { list } = res.data;
                        if (list) {
                            if (list.length == 0) {
                                this.$store.commit('MSG_POPUP_SHOW', {
                                    value: '暂无数据！'
                                });
                            }
                        }
                        this.$store.commit('LOADER_HIDE');
                    }
                });
                this.inputValue = '';

                return;
            }

            this.$store.commit('MSG_POPUP_SHOW', {
                value: '搜索信息不能为空！'
            });
        },
        toDetail(articleId) {

            let title = '';

            if (this.title.length > 0) {
                this.title.forEach((item) => {
                    if(item.on){
                        title = item.typeName
                    }
                });
            }

            if (articleId) {
                this.$router.push({ name: 'Dynamics', params: { articleId, title } })
            }
        }
    }
}

</script>
<style lang="scss" scoped>
.body {
    width: 100%;
    height: 100%;
}

@import '../../scss/_mixins.scss';
.scenario {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    padding-top: to(50);
    display: flex;
    flex-direction: column;
    .topPic {
        width: 100%;
        height: to(275);
        background: url(../../assets/img/competition.jpg) 0 0 no-repeat;
        background-size: 100%;
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
        padding: to(30);
        position: relative;
        display: flex;
        align-items: center;
        input {
            width: 80%;
            height: to(50);
            border-radius: to(25);
            text-align: left;
            color: #404040;
            font-size: $addFontSize5;
            padding: 0 to(25);
        }
        .seach {
            font-size: to(26);
            height: 100%;
            text-align: center;
            flex: 1;
        }
    } // .seacherBar:after {
    //     position: absolute;
    //     content: '';
    //     @include wh(33, 33);
    //     background: url(../../assets/img/search2.png) 0 0 no-repeat;
    //     background-size: 100%;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     right: to(50);
    // }
    .listBar {
        width: 100%;
        height: to(70);
        background: #cedeff;
        display: flex;
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
                    @include wh(232, 52);
                    background: #221d6f;
                    background-size: cover;
                    font-size: $addFontSize3;
                    text-align: center;
                    line-height: to(52);
                    color: #fff;
                    border-radius: to(30);
                    border: to(2) solid #fff;
                    .icon1 {
                        display: inline-block;
                        @include wh(45, 45);
                        background: url(../../assets/img/icon1.png) 0 0 no-repeat;
                        background-size: 100%;
                        vertical-align: middle;
                        margin-right: to(20);
                    }
                    .icon2 {
                        display: inline-block;
                        @include wh(45, 45);
                        background: url(../../assets/img/icon2.png) 0 0 no-repeat;
                        background-size: 100%;
                        vertical-align: middle;
                        margin-right: to(20);
                    }
                }
            }
            .on {
                span {
                    color: #ffd800;
                }
            }
        }
        li:nth-child(2) {
            border-left: to(2) solid #fff;
            border-right: to(2) solid #fff;
        }
        li:nth-child(3) {
            border-right: to(2) solid #fff;
        }
    }
    .scenario_main {
        flex: 1;
        overflow: auto;
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
                    line-height: to(28);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    margin-bottom: to(10); // min-height: to(50);
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
        line-height: to(60);
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
    .tag {
        margin-left: to(60);
        color: #ff5400;
    }
    .icon {
        background-size: to(28) to(20);
        background-image: url(../../assets/img/er.jpg);
        background-repeat: no-repeat;
        background-position: left center;
        padding-left: to(34);
    }
}

</style>
