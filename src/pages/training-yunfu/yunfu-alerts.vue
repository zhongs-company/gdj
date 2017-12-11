<template>
  <div class="detailBox">
    <div class="title">你好，我是标题</div>
    <div class="picBox">
      <img src="../../assets/img/pic.png">
      <div class="zan">
        <span><i class="start"></i>200</span>
        <span><i class="heart"></i>607</span>
      </div>
    </div>
    <div class="introduction">
      <div class="tips">课程介绍</div>
      <p class="text">讲师介绍：请于开课前准备好培训资料**************</p>
      <p class="text"> 内容简介：**************************</p>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {

    };
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';
.detailBox {
  width: 100%;
  height: 100%;
  background: #e6f4ff;
  padding: 0 to(30);
  overflow-x: hidden;
  .title {
    color: #040404;
    font-size: $addFontSize1;
    line-height: to(45);
    padding: to(40) 0;
    text-align: center;
    font-weight: bold;
    word-break: break-all;
  }
  .picBox {
    padding-bottom:to(30);
    img {
      width: 100%;
      height: to(216);
      margin-bottom: to(30);
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
      text-align: right;
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
        background: url(../../assets/img/start.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(10);
      }
    }
  }
  .introduction {
    position: relative;
    padding-top:to(60);
    padding-bottom:to(60);
    .tips {
      top:0;
      position: absolute;
      left: to(-100);
      @include wh(245, 45);
      background: url(../../assets/img/tips.png) 0 0 no-repeat;
      background-size: 100%;
      line-height:to(45);
      color:#fff;
      font-size:$addFontSize4;
      padding-left:to(90);
    }
    .text{
      line-height:to(40);
      font-size:$addFontSize4;
    }
  }
}

</style>
