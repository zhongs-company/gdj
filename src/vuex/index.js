import Vue from 'vue'
import Vuex from 'vuex'

import yfdt from './modules/yfdt'
import yxkck from './modules/yxkck'
import msgpopup from './modules/msgpopup'
import loader from './modules/loader'
import pxb from './modules/pxb'
import pxyf from './modules/pxyf'
import ks from './modules/ks'
import pxhd from './modules/pxhd'
import pxxq from './modules/pxxq'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
       yfdt,
       yxkck,
       msgpopup,
       loader,
       pxb,
       pxyf,
       ks,
       pxhd,
       pxxq
    }
})

export default store;
