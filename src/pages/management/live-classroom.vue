<template>
  <div class="roomBox">
    <div class="liveRoom">
      <div class="roomlist">
        <span class="roomLog">直播间</span>
        <img src="../../assets/img/pic.png">
      </div>
      <div class="roomlist">
        <span class="roomLog">直播间</span>
        <img src="../../assets/img/pic.png">
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
<style lang="scss" scoped>
@import '../../scss/_mixins.scss';

.roomBox {
  width: 100%;
  height: 100%;
  background: #e6f4ff;
  .liveRoom {
    
    .roomlist {
      padding: to(120) to(30) 0;
      position: relative;
      .roomLog {
        position: absolute;
        @include wh(130, 50);
        background: #fff;
        color: #000;
        left: 0;
        top: to(60);
        font-size: $addFontSize4;
        line-height: to(50);
        border-top-right-radius: to(30);
        border-bottom-right-radius: to(30);
        padding-left: to(30);
        font-weight: bold;
      }
      img {
        width: 100%;
      }
    }
  }
}

</style>
