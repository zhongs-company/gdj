<template>
  <div class="contentBox">
    <div class="title">
      <div class="left">
        <div class="searchLogo"></div>
        <input class="search" placeholder="请输入关键字搜索">
      </div>
      <div class="right"><span></span><i>分类</i></div>
    </div>
    <div class="listBox">
      <ul class="species">
        <li>技能类</li>
        <li>技能类</li>
        <li>技能类</li>
        <li>技能类</li>
        <li>技能类</li>
        <li>技能类</li>
        <li>技能类</li>
        <li>技能类</li>
      </ul>
      <ul class="picBox">
        <li>
          <div class="piclist">
            <img src="../../assets/img/pic.png">
            <p class="text">电网调度规程课件 副本</p>
            <div class="zan">
              <span><i class="start"></i>200</span>
              <span><i class="heart"></i>607</span>
            </div>
          </div>
        </li>
        <li>
          <div class="piclist">
            <img src="../../assets/img/pic.png">
            <p class="text">电网调度规程课件 副本</p>
            <div class="zan">
              <span><i class="start"></i>200</span>
              <span><i class="heart"></i>607</span>
            </div>
          </div>
        </li>
        <li>
          <div class="piclist">
            <img src="../../assets/img/pic.png">
            <p class="text">电网调度规程课件 副本</p>
            <div class="zan">
              <span><i class="start"></i>200</span>
              <span><i class="heart"></i>607</span>
            </div>
          </div>
        </li>
        <li>
          <div class="piclist">
            <img src="../../assets/img/pic.png">
            <p class="text">电网调度规程课件 副本</p>
            <div class="zan">
              <span><i class="start"></i>200</span>
              <span><i class="heart"></i>607</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <div class="left on"><i></i>热门课程</div>
      <div class="right"><i></i>收藏课程</div>
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
.contentBox {
  width: 100%;
  height: 100%;
  background: #e6f4ff;
  .title {
    height: to(80);
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 to(30);
    .left {
      @include wh(560, 50);
      background: #fff;
      border-radius: to(30);
      display: flex;
      justify-content:center;
      align-items:center;
      .searchLogo{
                @include wh(26,26);
        background: url(../../assets/img/search.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right:to(15);
      }
      .search{
        height:100%;
      }
    }
    .right {
      font-size: $addFontSize4;
      color: #040404;
      span {
        vertical-align: middle;
        display: inline-block;
        @include wh(38, 30);
        background: url(../../assets/img/list.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(20);
      }
      i {
        vertical-align: middle;
        display: inline-block;
      }
    }
  }
  .listBox {
    background: #fff;
    padding: 0 to(30) to(100);
    .species {
      padding: to(40) 0;
      text-align: center;
      li {
        @include wh(142, 50);
        background: #221d6f;
        border-radius: to(20);
        color: #ffd800;
        font-size: $addFontSize3;
        display: inline-block;
        text-align: center;
        line-height: to(50);
        margin-bottom: to(10);
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
          @include wh(333, 154);
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
          vertical-align:middle;
          span{
            display: inline-block;
            width:to(100);
          }
          .start {
            display: inline-block;
            @include wh(24, 23);
            background: url(../../assets/img/start.png) 0 0 no-repeat;
            background-size: 100%;
            margin-right:to(10);
          }
          .heart {
            display: inline-block;
            @include wh(24, 23);
            background: url(../../assets/img/start.png) 0 0 no-repeat;
            background-size: 100%;
            margin-right:to(10);
          }
        }
      }
    }
  }
  .bottom {
    position: fixed;
    left: 0;
    width: 100%;
    height: to(85);
    padding: 0 to(70);
    bottom: 0;
    background: #cedeff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: $addFontSize3;
    .left {
      @include wh(238, 58);
      background: #221d6f;
      border-radius: to(30);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #dedede;
      i {
        @include wh(32, 40);
        background: url(../../assets/img/fire.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(10);
      }
    }
    .right {
      @include wh(238, 58);
      background: #221d6f;
      border-radius: to(30);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #dedede;
      i {
        @include wh(44, 32);
        background: url(../../assets/img/file.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(10);
      }
    }
    .on {
      color: #ffd800;
    }
  }
}

</style>
