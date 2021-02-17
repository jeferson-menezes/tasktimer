// home
import * as types from './mutation-types'

export default {

  [types.SET_RECENT_TASKS](state, payload) {
    state.recentTasks = payload
  },

  [types.SET_ACTIVE_TASK](state, payload) {
    state.activeTask = payload
  },

  [types.SET_FINISHED_TASKS](state, payload) {
    state.finishedTask = payload
  },

  [types.SET_ACTIVE_SOMA_TIME](state, payload) {
    state.activeSomaTime = payload
  }
}
