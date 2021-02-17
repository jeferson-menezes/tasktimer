export default [
  {
    name: 'home',
    path: '/',
    meta: { icon: 'mdi-view-dashboard-outline', title: 'Timer' },
    component: () => import(/* webpackChunkName: "home" */ './Home.vue')
  }
]
