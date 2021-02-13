export default [
  {
    name: 'tasks',
    path: '/tasks',
    meta: { icon: 'mdi-calendar-check', title: 'Tasks' },
    component: () => import(/* webpackChunkName: "task" */ './Tasks')
  }
]
