<template>
    <!-- <transition name="left" mode="out-in"> -->
        <div class="center-page">
            <div class="total_count">
                <li class="total_course_count">已参加培训课程：{{ centerList.length }}门</li>
                <!-- <li class="total_score_count">总课时：56学时</li> -->
            </div>

            <div class="page-list" v-for="(item, index) in centerList" :key="index">
                <div class="list-title">{{item.className}}</div>
                <div class="list-item" @click="toPxb(item)">
                    <div class="list-span iconfont icon-monikaoshi">{{item.isSigned == 'Y' ? '已签到' :'未签到'}}</div>
                    <div class="list-span iconfont icon-kecheng">{{item.isEvaluated == 'Y' ?'已评估':'未评估'}}</div>
                </div>
                <!-- <div class="list-lable">0课时</div> -->
            </div>
        </div>
    <!-- </transition> -->
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    centerList: state => state.pxb.centerList
  }),
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("center_getMyClassPage");
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
    margin-bottom: to(10);
    background-color: #fff;
  }
  .page-list {
    margin-bottom: to(10);
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
