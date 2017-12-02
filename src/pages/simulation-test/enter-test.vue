<template>
  <div class="entertest">
    <div class="title">
      <div class="left">
        <div class="searchLogo"></div>
        <input class="search" placeholder="请输入关键字搜索">
      </div>
      <div class="right"><span></span></div>
    </div>
    <ul class="enterMain">
      <li>
        <h2>请输入标题名称请输入标题名称请输入标题名称</h2>
        <p>考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍</p>
      </li>
       <li>
        <h2>请输入标题名称请输入标题名称请输入标题名称</h2>
        <p>考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍</p>
      </li>
       <li>
        <h2>请输入标题名称请输入标题名称请输入标题名称</h2>
        <p>考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍考试内容介绍</p>
      </li>
    </ul>
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
.entertest {
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
      border-radius: to(40);
      display: flex;
      justify-content: center;
      align-items: center;
      .searchLogo {
        @include wh(26, 26);
        background: url(../../assets/img/search.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(15);
      }
      .search {
        height: 100%;
      }
    }
    .right {
      font-size: $addFontSize4;
      color: #040404;
      span {
        vertical-align: middle;
        display: inline-block;
        @include wh(38, 41);
        background: url(../../assets/img/person.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: to(20);
      }
      i {
        vertical-align: middle;
        display: inline-block;
      }
    }
  }
  .enterMain {
    li {
      background: #fff;
      margin-bottom: to(10);
      height: to(240);
      padding: to(30);
      h2 {
        font-size: $addFontSize4;
        color: #040404;
        line-height: to(34);
        margin-bottom: to(20);
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        font-size: $addFontSize5;
        color: #545454;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        line-height: to(34);
      }
    }
  }
}

</style>
