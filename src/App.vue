<template>
    <div id="app">
        <router-view></router-view>
        <!-- msgpopup -->
        <div class="msg-popup" v-show="isShow">{{value}}</div>
        <!-- loading -->
        <div class="loader-box" v-show="isShowLoader">
            <div class="loader line-spin-fade-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    computed: mapState({
        isShowLoader: state => state.loader.isShowLoader,
        isShow: state => state.msgpopup.isShow,
        value: state => state.msgpopup.value
    }),
    created() {

    }
};

</script>
<style lang="scss">
@import './scss/_mixins.scss';

@import url("./scss/_reset.scss");

#app {
    height: 100%;
}

.msg-popup {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: to(28);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: to(10);
    white-space: nowrap;
    padding: to(15) to(20);
    z-index: 9;
}

.left-enter-active,
.left-leave-active {
    transition: transform .3s ease;
}

.left-enter,
.left-leave-to {
    transform: translate3d(100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

//down
.down-enter-active,
.down-leave-active {
    transition: transform 0.3s ease;
}

.down-enter,
.down-leave-active {
    transform: translate3d(0, -100%, 0);
}


// loading start
@function delay($interval,
$count,
$index) {
    @return ($index * $interval) - ($interval * $count);
}

@mixin global-bg() {
    background-color: $primary-color;
}

@mixin global-animation() {
    animation-fill-mode: both;
}

@mixin balls() {
    @include global-bg();

    width: $ball-size;
    height: $ball-size;
    border-radius: 100%;
    margin: $margin;
}

@mixin lines() {
    @include global-bg();

    width: $line-width;
    height: $line-height;
    border-radius: 2px;
    margin: $margin;
}

$primary-color: #fff !default;
$ball-size: 15px !default;
$margin: 2px !default;
$line-height: 35px !default;
$line-width: 4px !default;

$radius: 20px;

@keyframes line-spin-fade-loader {
    50% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
}

@mixin line-spin-fade-loader($n:8,
$start:1) {
    @for $i from $start through $n {
        >div:nth-child(#{$i}) {
            $iter: 360 / $n;
            $quarter: ($radius / 2) + ($radius / 5.5);

            @if $i==1 {
                top: $radius;
                left: 0;
            }
            @else if $i==2 {
                top: $quarter;
                left: $quarter;
                transform: rotate(-45deg);
            }
            @else if $i==3 {
                top: 0;
                left: $radius;
                transform: rotate(90deg);
            }
            @else if $i==4 {
                top: -$quarter;
                left: $quarter;
                transform: rotate(45deg);
            }
            @else if $i==5 {
                top: -$radius;
                left: 0;
            }
            @else if $i==6 {
                top: -$quarter;
                left: -$quarter;
                transform: rotate(-45deg);
            }
            @else if $i==7 {
                top: 0;
                left: -$radius;
                transform: rotate(90deg);
            }
            @else if $i==8 {
                top: $quarter;
                left: -$quarter;
                transform: rotate(45deg);
            }

            animation: line-spin-fade-loader 1.2s delay(0.12s,
            $n,
            $i) infinite ease-in-out;
        }
    }
}

.line-spin-fade-loader {
    @include line-spin-fade-loader();
    position: relative;
    top: -10px;
    left: -4px;

    >div {
        @include lines();
        @include global-animation(); 
        background-color: rgba(0,0,0,0.5);
        position: absolute;
        width: 5px;
        height: 15px;

    }
}
.loader{
      width: to(100);
    height: to(100);
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
}

.loader-box {
    width: to(200);
    height: to(200);
    // background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
}

// loading end

</style>
