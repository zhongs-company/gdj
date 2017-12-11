<template>
  <div class="interfaceBox">
    <div class="enter" style="display:none">
      <div class="datiBox">
        <div class="datiTitle">你好，我是考试标题</div>
        <div class="content">考试注意事项：请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容</div>
        <div class="tips">考试注意事项:共有<i>2</i>次机会</div>
        <div class="beginBtn">开始答题</div>
      </div>
      <div class="recodeBox">
        <div class="recodeTitle">考试记录：</div>
        <div class="recodeTitle1">第一次考试</div>
        <p class="testTime">考试时间24/11 16:00 <i>成绩80分</i></p>
        <div class="timu">
          <div class="timutitle">这个世界谁最美（ ）</div>
          <div class="timuitem">A.我 b.你 c.她 d.大家</div>
        </div>
        <div class="daan">答案：A，你的答案是：A ，分数：5分 </div>
        <div class="jiexi">解析：我是答案我是答案我是答案我是答案我是答案我是答案我是答案 我是答案我是答案我</div>
      </div>
    </div>
    <div class="nextBox">
      <div class="evaluationBox">
        <div class="title">电网调度规程课件</div>
        <div class="introduction">
          <div class="questionBox">
            <div class="questiontitle">1、快速切除线路与母线的短路故障，是提高电力系统的（ ）的最重要的手段。</div>
            <ul class="questionitem">
              <li class="on">A.暂时稳定</li>
              <li>B.暂时稳定</li>
              <li>C.暂时稳定</li>
              <li>D.暂时稳定</li>
              <li class="on">A.暂时稳定</li>
              <li>B.暂时稳定</li>
              <li>C.暂时稳定</li>
              <li>D.暂时稳定</li>
              <li class="on">A.暂时稳定</li>
              <li>B.暂时稳定</li>
              <li>C.暂时稳定</li>
              <li>D.暂时稳定</li>
              <li class="on">A.暂时稳定</li>
              <li>B.暂时稳定</li>
              <li>C.暂时稳定</li>
              <li>D.暂时稳定</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btnlist">
        <div class="beginBtn">下一题</div>
        <div class="beginBtn">提交</div>
      </div>
    </div>
    <div class="endPop">
      <h2 class="endTitel">您本次考试的成绩为:</h2>
      <div class="points"><i>95</i>分</div>
      <div class="btnlist">
        <div class="beginBtn">查看全部答案</div>
        <div class="beginBtn">查看错题集</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';

html {
  background: #e6f4ff;
}

.interfaceBox {
  width: 100%;
  height: 100%;
  background: #e6f4ff;
  padding: 0 to(28);
  .datiBox {
    .datiTitle {
      text-align: center;
      padding: to(30) 0;
      color: #040404;
      font-size: $addFontSize1;
    }
    .content {
      color: #292929;
      font-size: $addFontSize4;
      line-height: to(40);
      padding-bottom: to(40);
    }
    .tips {
      color: #292929;
      font-size: $addFontSize4;
      padding-bottom: to(60);
      border-bottom: solid #fff to(2);
      i {
        color: #f0500f;
      }
    }
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
  .recodeBox {
    .recodeTitle {
      font-size: $addFontSize4;
      color: #292929;
      display: inline-block;
      height: to(60);
      line-height: to(60);
      border-bottom: to(2) solid #7d7d7d;
    }
    .recodeTitle1 {
      font-size: $addFontSize4;
      color: #292929;
      padding: to(50) 0 to(15);
    }
    .testTime {
      font-size: $addFontSize5;
      color: #606060;
    }
    .timu {
      padding-top: to(50);
      font-size: $addFontSize4;
      color: #292929;
      .timutitle {
        font-size: $addFontSize5;
        color: #606060;
        padding-bottom: to(20);
      }
      .timuitem {
        font-size: $addFontSize5;
        color: #606060;
        line-height: to(40);
        padding-bottom: to(20);
      }
    }
    .daan {
      font-size: $addFontSize5;
      color: #606060;
      line-height: to(40);
      padding-bottom: to(20);
    }
    .jiexi {
      font-size: $addFontSize5;
      color: #606060;
      line-height: to(40);
    }
  }

  .nextBox {

    .evaluationBox {
      width: 100%;
      height: 100%;
      background: #e6f4ff;
      padding: 0 to(30);
      overflow-x: hidden;
      max-height: to(700);
      overflow-y: scroll;
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
        padding-bottom: to(60);

        .questionBox {
          padding-bottom: to(45);
          .questiontitle {
            font-size: $addFontSize3;
            color: #040404;
            padding-bottom: to(20);
            line-height: to(48);
          }
          .questionitem {
            li {
              padding-left: to(40);
              color: #484848;
              font-size: $addFontSize4;
              padding-bottom: to(20);
              position: relative;
            }
            .on:after {
              content: '';
              position: absolute;
              background: #eb6100;
            }
            li:after {
              content: '';
              position: absolute;
              left: to(5);
              top: to(0);
              background: #fff;
              @include wh(20, 20);
              border-radius: 50%;
            }
          }
        }
        .text {
          line-height: to(40);
          font-size: $addFontSize4;
        }
      }
    }
    .btnlist {
      position:fixed;
      left:0;
      width:100%;
      bottom:to(50);
      display: flex;
      justify-content:space-between;
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
}

.endPop{
  @include wh(671,476);
  background: url(../../assets/img/endBox.jpg) 0 0 no-repeat;
  background-size: 100%;
  position:fixed;
  left:50%;
  top:50%;
  -webkit-transform: translate(-50%,-50%);
  box-shadow: 0 0 to(20) rgba(0,0,0,0.2);
  padding:0 to(70);
  .endTitel{
    height:to(170);
    line-height:to(170);
    color:#000000;
    font-size:$addFontSize1;
    text-align:center;
    font-size:$addFontSize1;
  }
  .points{
    text-align:center;
    color:#000000;
    i{
      color:#ff4e00;
    }
  }
      .btnlist {
      position:fixed;
      left:0;
      width:100%;
      bottom:to(50);
      display: flex;
      justify-content:space-between;
     .beginBtn {
        @include wh(259, 58);
        background: url(../../assets/img/endBtn.png) 0 0 no-repeat;
        background-size: 100%;
        margin: to(85) auto to(50);
        color: #000;
        font-size: $addFontSize2;
        text-align: center;
        line-height: to(58);
      }
    }
}

</style>
