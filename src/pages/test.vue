<template>
    <div class="hello">
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: "HelloWorld",
        data() {
            return {
                beforeHash: "",
                currentHash: "",
                msg: "Welcome to Your Vue.js App"
            };
        }
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


</style>
