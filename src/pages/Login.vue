<template>

  <div class="bindBg">
    <div class="title"></div>
    <ul class="inputList">
      <li>
        <div class="left">姓名</div>
        <span></span>
        <input class="right">
      </li>
      <li>
        <div class="left">公号</div>
        <span></span>
        <input class="right">
      </li>
    </ul>
    <div class="bindBtn">用户绑定</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: mapState({
        tabs: state => state.yfdt.tabs
    }),
    data() {
        return {
            msg: "Welcome to Your Vue.js App"
        };
    },
    created() {
        this.$store.dispatch("getSysType", () => {
            console.log(this.tabs)
        });
    },
    methods: {}
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../scss/_mixins.scss';
.bindBg {
  width: 100%;
  height: 100%;
  background: url(../assets/img/bindBg.jpg) 0 0 no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  padding: to(300) 0 0;
  .title {
    position: absolute;
    left: to(30);
    top: to(40);
    @include wh(268, 51);
    background: url(../assets/img/bindTitle.png) 0 0 no-repeat;
    background-size: 100%;
  }
  .inputList {
    text-align: center;
    li {
      margin: 0 auto to(55);
      @include wh(538, 50);
      background: #0d28af;
      border-radius: to(50);
      border: to(3) solid #98b3e7;
      display: flex;
      align-items: center;
      color: #fff;
      .left {

        font-size: $addFontSize3;
        width: to(100);
        border-right: to(1) solid #fff;
        text-align: center;
        margin-right: to(10);
      }
      input {
        width: to(400);
        background: transparent;
        color: #fff;
      }
    }
  }
  .bindBtn {
    @include wh(317,68);
    background: url(../assets/img/bindBtn.png) 0 0 no-repeat;
    background-size: 100%;
    text-align:center;
    line-height:to(68);
    margin:to(200) auto 0;
    font-size: $addFontSize2;
    color:#fff;
  }
}


</style>
