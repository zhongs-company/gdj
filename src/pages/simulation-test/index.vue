<template>
    <div class="body">
        <router-view></router-view>
        <div class="entertest">
            <div class="title">
                <div class="left">
                    <div class="searchLogo"></div>
                    <input class="search" placeholder="请输入关键字搜索" v-model="input" v-on:keyup.enter="seach">
                </div>
                <div class="right" @click="seach"><span></span></div>
            </div>
            <ul class="enterMain">
                <li v-for="(item, index) in list" :key="index" @click="toDetail(item.examId)">
                    <h2>{{item.examTitle}}</h2>
                    <p>{{item.examDesc}}</p>
                    <p>开始时间：{{item.createTime}}</p>
                    <p>结束时间：{{item.endTime}}</p>
                    <p v-if="item.phase == 'A'">待开始</p>
                    <p v-if="item.phase == 'B'">进行中</p>
                    <p v-if="item.phase == 'C'">已结束</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

// A 待开始
// B 进行中
// C 已结束

import { mapState } from "vuex";

export default {
    data() {
        return {
            input: ''
        }
    },
    computed: mapState({
        list: state => state.ks.list
    }),
    created() {
        this.$store.dispatch('ks_getMyCanExamAll', { examTitle: '' });
    },
    methods: {
        toDetail(examId) {
            this.$router.push({ name: 'Entertest', params: { examId } })
        },
        // toCenter() {
        //     this.$router.push({ name: 'Center' });
        // },
        seach() {
            if (this.input.trim()) {
                this.$store.dispatch('ks_getMyCanExamAll', { examTitle: this.input.trim() });
                this.input = '';
            } else {
                this.$store.commit('MSG_POPUP_SHOW', {
                    value: '搜索信息不能为空！'
                });
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
.entertest {
    width: 100%;
    height: 100%;
    background: #e6f4ff;
    .title {
        height: to(80);
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 to(30);
        .left {
            @include wh(560, 50);
            background: #fff;
            border-radius: to(40);
            display: flex;
            justify-content: center;
            align-items: center;
            .searchLogo {
                @include wh(26, 26);
                background: url(../../assets/img/search.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(15);
            }
            .search {
                height: 100%;
            }
        }
        .right {
            font-size: $addFontSize4;
            color: #040404;
            span {
                vertical-align: middle;
                display: inline-block;
                @include wh(38, 41);
                background: url(../../assets/img/search.png) 0 0 no-repeat;
                background-size: 100%;
                margin-right: to(20);
            }
            i {
                vertical-align: middle;
                display: inline-block;
            }
        }
    }
    .enterMain {
        li {
            background: #fff;
            margin-bottom: to(10);
            height: to(240);
            padding: to(30);
            h2 {
                font-size: $addFontSize4;
                color: #040404;
                line-height: to(34);
                margin-bottom: to(20);
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            p {
                font-size: $addFontSize5;
                color: #545454;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                line-height: to(34);
            }
        }
    }
}

</style>
