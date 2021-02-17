// config
import * as types from './mutation-types'

export default {
  [types.SET_THEME_DARK](state, payload) {
    state.themeDark = payload
  },
}
