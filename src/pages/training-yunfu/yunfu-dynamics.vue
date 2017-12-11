<template>
  <div class="scenario">

    <ul class="listBar">
      <li>
        <div class="item on"><span><i class="icon1"></i>安全管理</span></div>
      </li>
      <li>
        <div class="item"><span><i class="icon2"></i>管理体系</span></div>
      </li>
    </ul>
        <div class="seacherBar">
      <input placeholder="请输入搜索内容">
    </div>
    <ul class="scenario_main">
      <li>
        <div class="left"><img src="../../assets/img/pic.png"></div>
        <div class="right">
          <h2>请输入标题名称请输入标题名称 请输入标题名称</h2>
          <p>课程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容</p>
          <div class="zan">
            <span><i class="heart"></i>607</span>
          </div>
        </div>
      </li>
      <li>
        <div class="left"><img src="../../assets/img/pic.png"></div>
        <div class="right">
          <h2>请输入标题名称请输入标题名称 请输入标题名称</h2>
          <p>课程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容</p>
          <div class="zan">
            <span><i class="heart"></i>607</span>
          </div>
        </div>
      </li>
    </ul>
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

.scenario {
  width: 100%;
  height: 100%;
  background: #e6f4ff;
  padding-top:to(50);
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

  .seacherBar:after {
    position: absolute;
    content: '';
    @include wh(33, 33);
    background: url(../../assets/img/search2.png) 0 0 no-repeat;
    background-size: 100%;
    top: 50%;
    transform: translateY(-50%);
    right: to(50);
  }

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
            vertical-align:middle;
            margin-right:to(20);
          }
          .icon2 {
            display: inline-block;
             @include wh(45,45);
            background: url(../../assets/img/icon2.png) 0 0 no-repeat;
            background-size: 100%;
             vertical-align:middle;
              margin-right:to(20);
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
          -webkit-line-clamp: 2;
          margin-bottom: to(20);
          min-height: to(50);
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
