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
          </div>
        </li>
        <li>
          <div class="piclist">
            <img src="../../assets/img/pic.png">
            <p class="text">电网调度规程课件 副本</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <img src="../../assets/img/pic.png">
            <p class="text">电网调度规程课件 副本</p>
          </div>
        </li>
        <li>
          <div class="piclist">
            <img src="../../assets/img/pic.png">
            <p class="text">电网调度规程课件 副本</p>
          </div>
        </li>
      </ul>
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
        border-bottom:to(10) solid #e6f4ff;
        padding:to(20) 0;
        .piclist {
          width: to(333);
          margin: 0 auto;
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
}

</style>
