import { routes as home } from '../views/home'
import { routes as task } from '../views/task'

import { routes as history } from '../views/history'


export default [
  ...home,
  ...task,
  ...history,
]
