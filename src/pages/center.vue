<template>
  <div class="centerBg">
    <div class="top">
      <img class="personpic" :src="headimgurl">
      <p class="name">{{nickname}}</p>
    </div>
    <ul class="list">
      <!-- <li>
        <div class="img1"></div>
        <div class="right">我的报名</div>
      </li> -->
      <li>
        <div class="img2"></div>
        <div class="right" @click="gotoMyExam()">我的考试</div>
      </li>
      <!-- <li>
        <div class="img3"></div>
        <div class="right">我的签到</div>
      </li> -->
      <!-- <li>
        <div class="img4"></div>
        <div class="right" @click="gotoMyEvaluate()">我的评估</div>
      </li> -->
      <li>
        <div class="img4"></div>
        <div class="right" @click="toMyClass">我的课堂</div>
      </li>
      <li>
        <div class="img5"></div>
        <div class="right" @click="toCollect">我的收藏</div>
      </li>
    </ul>
  </div>
</template>

<script>

import * as utils from "@/lib/utils";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      nickname:'',
      headimgurl:''
    };
  },
  created(){
    console.log(utils.userInfo);
    //console.log($("p.name"))
    //$("p.name").html(utils.userInfo.nickname);

    var { nickname,headimgurl } = utils.userInfo;
    this.nickname = decodeURIComponent(nickname);
    this.headimgurl = headimgurl;
  },
  methods:{
    toMyClass(){
      this.$router.push({ name: 'CenterPage'})

    },
    gotoMyExam(){
      this.$router.push({ name: 'SimulatiionTest'})
    },
    toCollect(){
      this.$router.push({ name: 'LibraryCollect'})
    }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/_mixins.scss';
.centerBg {
  width: 100%;
  height: 100%;
  background: #e6f4ff;
  .top {
    width: 100%;
    height: to(344);
    background: url(../assets/img/centerbg.jpg) 0 0 no-repeat;
    background-size: 100%;
    padding-top: to(60);
    .personpic {
      @include wh(150, 150);
      border-radius: 50%;
      background: #fff;
      margin: 0 auto;
    }
    .name {
      padding-top: to(15);
      font-size: $addFontSize2;
      color: #fff;
      text-align: center;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      padding: to(15) to(50) 0;
      text-overflow: ellipsis;
    }
  }
  .list {
    padding:to(30) 0 0;
    li {
          padding:0 to(30) 0;
      border-bottom:to(20) #fff solid;
      height: to(100);
      display: flex;
      align-items: center;
      .img1 {
        @include wh(41, 41);
        background: url(../assets/img/signup.png) center center no-repeat;
        background-size: to(37) to(28);
      }
      .img2 {
        @include wh(41, 41);
        background: url(../assets/img/examination.png) center center no-repeat;
        background-size: to(41) to(37);
      }
      .img3 {
       @include wh(41, 41);
        background: url(../assets/img/Signin.png) center center no-repeat;
        background-size: to(35) to(35);
      }
      .img4 {
        @include wh(41, 41);
        background: url(../assets/img/evaluate.png) center center no-repeat;
        background-size: to(36) to(37);
      }
      .img5 {
       @include wh(41, 41);
        background: url(../assets/img/classroom.png) center center no-repeat;
        background-size: to(35) to(32);
      }
      .right {
        padding-left: to(40);
        font-size: $addFontSize3;
        box-flex: 1;
        flex: 1;
      }
    }
  }
}

</style>
