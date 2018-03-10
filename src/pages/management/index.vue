<template>
  <div class="body">
      <textarea name="text" id="" cols="30" rows="10" autofocus="autofocus"></textarea>
      <router-view></router-view>
  </div>
</template>
<script>
export default {

  created() {
    
  },

  methods: {

  }
}

</script>
<style lang="scss" scoped>
  .body{
    width:100%;
    height:100%;
  }

</style>
