// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import FastClick from 'fastclick';


document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
}, false);

import Vue from 'vue'

require('@/lib/directive')(Vue)

import App from './App'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    store,
    components: {
        App
    }
})

window.store = store;
