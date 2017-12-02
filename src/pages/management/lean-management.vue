<template>
  <div class="management">
    <div class="title">
      <div class="shearchbar">
        <input placeholder="请输入搜索内容"><span class="shearchLog"></span></div>
    </div>
    <ul class="listBar">
      <li>
        <div class="item on"><span>管理精髓</span></div>
      </li>
      <li>
        <div class="item"><span>直播课堂</span></div>
      </li>
      <li>
        <div class="item"><span>精益场景化</span></div>
      </li>
    </ul>
    <div class="managementMain">
      <ul class="picBox">
        <li>
          <div class="piclist">
            <div class="tipsLogo">安全管理</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <div class="tipsLogo">安全管理</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <div class="tipsLogo">安全管理</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <div class="tipsLogo">安全管理</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
      </ul>
      <div class="more">查看更多>></div>
    </div>
    <div class="liveRoom">
        <div class="roomlist">
          <span class="roomLog">直播间</span>
          <img src="../../assets/img/pic.png">
        </div>
        <div class="roomlist">
          <span class="roomLog">直播间</span>
          <img src="../../assets/img/pic.png">
        </div>
      <div class="more">查看更多>></div>
    </div>
        <div class="managementMain">
      <ul class="picBox">
        <li>
          <div class="piclist">
            <div class="tipsLogo">高温场景化</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <div class="tipsLogo">高温场景化</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <div class="tipsLogo">高温场景化</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <div class="tipsLogo">安全管理</div>
            <img src="../../assets/img/pic.png">
            <p class="text">请输入标题名称</p>
          </div>
        </li>
      </ul>
      <div class="more">查看更多>></div>
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

.management {
  width: 100%;
  height: 100%;
  background: #e6f4ff;
  .title {
    width: 100%;
    height: to(349);
    background: url(../../assets/img/manBg.jpg) 0 0 no-repeat;
    background-size: 100%;
    padding: to(20) to(30) 0;
    .shearchbar {
      position: relative;
      input {
        width: 100%;
        height: to(50);
        line-height: to(50);
        font-size: $addFontSize4;
        text-align: center;
        border-radius: to(30);
        background: rgba(255, 255, 255, 0.7);
        padding: 0 to(90);
      }
      .shearchLog {
        display: block;
        position: absolute;
        top: 55%;
        right: to(30);
        -webkit-transform: translateY(-50%);
        @include wh(26, 26);
        background: url(../../assets/img/search.png) 0 0 no-repeat;
        background-size: 100%;
      }
    }
  }
  .listBar {
    width: 100%;
    height: to(70);
    margin: to(30) 0;
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
          @include wh(171, 57);
          background: url(../../assets/img/btn1.png) 0 0 no-repeat;
          background-size: 100%;
          font-size: $addFontSize3;
          text-align: center;
          line-height: to(57);
          color: #fff;
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
  }
  .managementMain {
    background: #fff;
    .picBox {
      font-size: 0;
      li {
        width: 50%;
        display: inline-block;
        border-bottom: to(20) solid #e6f4ff;
        padding-top: to(20);
        .piclist {
          width: to(333);
          margin: 0 auto;
          position: relative;
        }
        .tipsLogo {
          position: absolute;
          left: 0;
          top: 0;
          @include wh(150, 50);
          background: #221d6f;
          border-bottom-right-radius: to(30);
          border-top-right-radius: to(30);
          color: #ffd800;
          font-size: $addFontSize4;
          line-height: to(50);
          padding-left: to(20);
        }
        img {
          @include wh(333, 180);
          height: auto;
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
    }
      .more {
      text-align: right;
      font-size: $addFontSize4;
      color: #626262;
      padding: to(10) to(30);
      border-bottom: to(20) solid #e6f4ff;
      background:#fff;
    }
    
  }
  .liveRoom {
    
    .roomlist{
      padding: to(70) to(30) to(30);
      position: relative;
      .roomLog{
        position:absolute;
        @include wh(130,50);
        background:#fff;
        color:#000;
        left:0;
        top:to(0);
        font-size:$addFontSize4;
        line-height:to(50);
        border-top-right-radius:to(30);
        border-bottom-right-radius:to(30);
        padding-left:to(30);
        font-weight: bold;
      }
      img{
        width:100%;
      }
    }
    .more {
      text-align: right;
      font-size: $addFontSize4;
      color: #626262;
      padding: to(10) to(30);
      border-bottom: to(20) solid #e6f4ff;
      background:#fff;
    }
  }



}

</style>
