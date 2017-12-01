<template>
    <div class="hello">
        123
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
<style lang="scss">


</style>
