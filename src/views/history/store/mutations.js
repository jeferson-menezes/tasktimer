// history
import * as types from './mutation-types'

export default {
  [types.SET_NOTES](state, payload) {
    state.notes = payload
  }
}
