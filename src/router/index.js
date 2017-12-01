import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Test from '@/pages/Test'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            next();
        }
    }, {
        path: '/test',
        name: 'Test',
        component: Test
    }]
})
