import Vue from 'vue'
import Vuex from 'vuex'

import yfdt from './modules/yfdt'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
       yfdt
    }
})

export default store;
