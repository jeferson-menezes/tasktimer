// task
import * as types from './mutation-types'

export default {
  [types.SET_TASKS](state, payload) {
    state.tasks = payload
  },
  [types.SET_TASK](state, payload) {
    state.task = payload
  }
}
