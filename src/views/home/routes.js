export default [
  {
    name: 'home',
    path: '/',
    meta: { icon: 'mdi-view-dashboard-outline', title: 'Home' },
    component: () => import(/* webpackChunkName: "home" */ './Home.vue')
  }
]
