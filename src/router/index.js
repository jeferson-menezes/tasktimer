import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({ routes })

// router.beforeEach((to, from, next) => { 
//     if (from.name '') {
        
//     }    
// })

export default router
