<template>
    <div class="interfaceBox">
        <div class="inter-pic" v-for="(li, index) in list" @click="toDetail(li)" :key="index">
            <img :src="li.coverImg" alt="">
            <span class="msg">{{li.voteTitle}}</span>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    data() {
        return {

        };
    },
    computed: mapState({
        list: state => state.pxxq.list
    }),
    created() {
        this.$store.dispatch('pxxq_voteInfo');
    },
    methods: {
        toDetail(li) {

            if (li.isVoted == 'Y') {
                this.$store.commit('MSG_POPUP_SHOW', {
                    value: '已经填写过！'
                });
                return;
            }

            this.$store.commit('MSG_POPUP_HIDE');

            var { voteId, voteTitle } = li;

            this.$router.push({
                name: 'Trainingneeds',
                params: { voteId, voteTitle }
            })
        }
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';
.interfaceBox {
    background-color: #e6f4ff;
    height: 100%;
    overflow: auto;
    .inter-pic {
        height: to(400);
        position: relative;
        margin-bottom: to(20);
        img {
            width: 100%;
            height: 100%;
        }
        .msg {
            position: absolute;
            left: 0;
            bottom: 0;
            height: to(60);
            font-size: to(28);
            color: #323232;
            line-height: to(60);
            background-color: rgba(0, 0, 0, 0.6);
            color: #fff;
            width: 100%;
            padding: 0 to(20);
        }
    }
}

</style>
