<template>
    <transition name="left" mode="in-out">
      <div class="listBox" v-scroll>
          <ul class="picBox">
              <li v-for="(item, index) in favoriteList" :key="index">
                  <div class="piclist">
                      <img :src="item.coverImg | url" @click="toDetailPage(item.courseId)">
                      <p class="text">{{item.courseTitle}}</p>
                      <div class="zan">
                          <span @click="fav(item)"><i class="start"></i>{{item.favoriteCount}}</span>
                          <span @click="zan(item)"><i class="heart"></i>{{item.upCount}}</span>
                      </div>
                  </div>
              </li>
              <!-- <div class="pull-msg" v-show="page>total">没数据了</div> -->
          </ul>
      </div>
    </transition>
</template>
<script>
import { mapState } from "vuex";
import * as config from "@/lib/config";
import favZanMixin from "@/mixin/favZanMixin";


export default {
  computed: mapState({
    favoriteList: state => state.yxkck.favoriteList
  }),
  mixins: [favZanMixin],
  created() {
    if (this.favoriteList.length == 0) {
      this.$store.dispatch("yxkck_elnCourseGetPageFavorite");
    }
  },
  filters: {
    url(url) {
      return config.cdn_img_src + url;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/_mixins.scss";
.listBox {
  background: #fff;
  padding: to(20) to(30) to(100);
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
</style>



