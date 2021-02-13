export default [
  {
    name: 'history',
    path: '/history',
    meta: { icon: 'mdi-history', title: 'History' },
    component: () => import(/* webpackChunkName: "history" */ './History')
  }
]
