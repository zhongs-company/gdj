<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
import * as config from "@/lib/config";

export default {
  name: "app",
  created() {
    config.wxChankeAuthorize(userInfo => {
      console.log(userInfo);
    });
  }
};
</script>
<style lang="scss">
@import url("./scss/_reset.scss");
</style>
