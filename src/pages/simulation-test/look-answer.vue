<template>
  <div class="interfaceBox">
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
            </ul>
            <div class="rightBox">
              <div class="rightTitle">正确答案：<i>C</i></div>
              <div class="jiexi">       解析：请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容请输入文本内容</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnlist">
        <div class="beginBtn">下一题</div>
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
  .nextBox {

    .evaluationBox {
      width: 100%;
      height: 100%;
      background: #e6f4ff;
      padding: 0 to(30);
      overflow-x: hidden;
      max-height: to(1000);
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
              padding-bottom:to(42);
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

.rightBox{
  .rightTitle{
    color:#000000;
    font-size:$addFontSize4;
    i{
      color:#eb6100;
    }
  }
  .jiexi{
    padding:to(50) 0;
    color:#000000;
    font-size:$addFontSize4;
    line-height:to(36);
    text-indent: to(30);
  }
}

</style>
