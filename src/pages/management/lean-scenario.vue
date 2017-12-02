<template>
  <div class="scenario">
    <ul class="listBar">
      <li>
        <div class="item on"><span>安全管理</span></div>
      </li>
      <li>
        <div class="item"><span>设备管理</span></div>
      </li>
      <li>
        <div class="item"><span>管理体系</span></div>
      </li>
      <li>
        <div class="item"><span>人才管理</span></div>
      </li>
    </ul>
    <ul class="scenario_main">
      <li>
        <div class="left"><img src="../../assets/img/pic.png"></div>
        <div class="right">
          <h2>请输入标题名称请输入标题名称 请输入标题名称</h2>
          <p>课程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容</p>
        </div>
      </li>
       <li>
        <div class="left"><img src="../../assets/img/pic.png"></div>
        <div class="right">
          <h2>请输入标题名称请输入标题名称 请输入标题名称</h2>
          <p>课程内容课程内容课程内容课程内容课程内容课程内容课程内容课程内容</p>
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
  padding-top: to(30);
  .listBar {
    width: 100%;
    height: to(70);
    margin-bottom: to(30);
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
          @include wh(145, 52);
          background: #221d6f;
          background-size: cover;
          font-size: $addFontSize3;
          text-align: center;
          line-height: to(52);
          color: #fff;
          border-radius: to(30);
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
    padding: to(30) 0;
    li {
      padding: to(30);
      margin-bottom:to(20);
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
          min-height:to(50);
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

</style>
