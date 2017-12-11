<template>
  <div class="detailBox">
    <div class="title">电网调度规程培训<span></span></div>
    <div class="picBox">
      <img src="../../assets/img/pic.png">
      <div class="zan">
        <span><i class="start"></i>200</span>
        <span><i class="heart"></i>607</span>
      </div>
      <div class="btnlist">
        <div class="beginBtn on">课程介绍</div>
        <div class="beginBtn">课程讨论</div>
      </div>
    </div>
    <!-- 课程介绍 -->
    <div class="introduction" style="display:none">
      <p class="text"><i>开课地点：</i><span>教学楼3楼</span></p>
      <p class="text"><i>注意事项：</i> <span>请于开课前准备好培训资料*************</span></p>
      <p class="text"><i>课程介绍：</i> <span>********************************************* ************************************</span>
      </p>
      <p class="text"> <i>注意事项：</i><span>请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************请于开课前准备好培训资料**************</span></p>
      <div class="btnlist1">
        <div class="beginBtn">培训报名</div>
      </div>
    </div>
    <!-- 课程讨论 -->
    <div class="introduction1">
      <ul>
        <li class="discuss">
          <div class="left"><img src="../../assets/img/litterBtn.png"></div>
          <div class="right">
            <h2>微信昵称</h2>
            <p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论......</p>
          </div>
        </li>
        <li class="discuss">
          <div class="left"><img src="../../assets/img/litterBtn.png"></div>
          <div class="right">
            <h2>微信昵称</h2>
            <p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论......</p>
          </div>
        </li>
        <li class="discuss">
          <div class="left"><img src="../../assets/img/litterBtn.png"></div>
          <div class="right">
            <h2>微信昵称</h2>
            <p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论......</p>
          </div>
        </li>
        <li class="discuss">
          <div class="left"><img src="../../assets/img/litterBtn.png"></div>
          <div class="right">
            <h2>微信昵称</h2>
            <p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论......</p>
          </div>
        </li>
        <li class="discuss">
          <div class="left"><img src="../../assets/img/litterBtn.png"></div>
          <div class="right">
            <h2>微信昵称</h2>
            <p>评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论......</p>
          </div>
        </li>
      </ul>
      <div class="inputBat">
        <input>
        <div class="inputLogo"><i></i><span>写评论</span></div>
      </div>
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
    padding-bottom: to(30);
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
    .btnlist {
      display: flex;
      justify-content: space-between;
      .beginBtn {
        @include wh(156, 44);
        background: url(../../assets/img/litterBtn.png) 0 0 no-repeat;
        background-size: 100%;
        margin: to(45) auto;
        color: #fff;
        font-size: $addFontSize2;
        text-align: center;
        line-height: to(45);
      }
      .on {
        color: #ff5400;
      }
    }
  }
  .introduction {
    position: relative;
    padding-bottom: to(60);
    max-height: to(600);
    overflow-y: scroll;
    .tips {
      top: 0;
      position: absolute;
      left: to(-100);
      @include wh(245, 45);
      background: url(../../assets/img/tips.png) 0 0 no-repeat;
      background-size: 100%;
      line-height: to(45);
      color: #fff;
      font-size: $addFontSize4;
      padding-left: to(90);
    }
    .text {
      line-height: to(40);
      font-size: $addFontSize4;
      display: flex;
      i {
        width: to(150);
      }
      span {
        box-flex: 1;
        flex: 1;
      }
    }
  }


  .btnlist1 {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: to(50);
    display: flex;
    justify-content: space-between;
    .beginBtn {
      @include wh(259, 58);
      background: url(../../assets/img/datiBtn.png) 0 0 no-repeat;
      background-size: 100%;
      margin: to(85) auto to(50);
      color: #fff;
      font-size: $addFontSize2;
      text-align: center;
      line-height: to(58);
    }
  }
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

.introduction1 {
  ul {
    position: relative;
    max-height: to(600);
    overflow-y: scroll;
    border-top: to(2) solid #fff;
    .discuss {
      display: flex;
      height: to(150);
      border-bottom: to(2) solid #fff;
      align-items: center;
      .left {
        width: to(120);
        img {
          width: to(100);
          height: to(100);
          border-radius: 50%;
        }
      }
      .right {
        box-flex: 1;
        flex: 1;
        h2 {
          color: #000000;
          font-size: $addFontSize4;
          margin-bottom: to(10);
          font-weight: bold;
          width: to(400);
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          color: #484848;
          font-size: $addFontSize5;
          line-height: to(30);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          width: to(500);
        }
      }
    }
  }
  .inputBat {
    position: fixed;
    left: 0;
    bottom: to(100);
    left: 50%;
    -webkit-transform: translateX(-50%);

    input {
      @include wh(620, 45);
      border-radius: to(25);
      background: transparent;
      border-radius: to(25);
      border: to(2) solid #a7a7a7;
      padding: 0 to(40);
      font-size: $addFontSize4;
    }
    .inputLogo {
       position:absolute;
      left:0;
      top:0;
      
      color:#a7a7a7;
      font-size:$addFontSize5;
      vertical-align:middle;
     width:100%;
     height:100%;
     text-align:center;
     line-height:to(60);
     pointer-events:none;
      i {
        display: inline-block;
        vertical-align:middle;
        @include wh(27, 26);
        background: url(../../assets/img/inputLogo.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right:to(10);
      }
      span{
        display: inline-block;
        vertical-align:middle;
      }
     
    }
  }
}

</style>
