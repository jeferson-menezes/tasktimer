// config
import * as types from './mutation-types'
import { Config, KeyConfig } from '../../../model/config';
import { ConfigDao } from '../../../model/config-dao';
import { ConnectionFactory } from '../../../model/connection-factory';

export const ActionGetThemeDark = async ({ dispatch, commit }) => {
    return new ConfigDao(await ConnectionFactory.getConnection())
        .get(KeyConfig.THEME_DARK).then(res => {
            if (res) {
                commit(types.SET_THEME_DARK, res.value)
            } else {
                dispatch('ActionSetThemeDark', new Config(KeyConfig.THEME_DARK, false))
            }
        })
}

export const ActionSetThemeDark = async ({ commit }, payload) => {
    return new ConfigDao(await ConnectionFactory.getConnection())
        .set(payload).then(res =>{
            console.log(res);
            commit(types.SET_THEME_DARK, res.value)
        })
}