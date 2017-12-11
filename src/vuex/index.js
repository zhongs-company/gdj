import Vue from 'vue'
import Vuex from 'vuex'

import yfdt from './modules/yfdt'
import yxkck from './modules/yxkck'
import msgpopup from './modules/msgpopup'
import loader from './modules/loader'
import pxb from './modules/pxb'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
       yfdt,
       yxkck,
       msgpopup,
       loader,
       pxb
    }
})

export default store;
