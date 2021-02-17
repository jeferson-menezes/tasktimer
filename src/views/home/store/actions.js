// home
import { ConnectionFactory } from '../../../model/connection-factory';
import { TaskDao } from '../../../model/task-dao';
import { TimeDao } from '../../../model/time-dao';
import * as types from './mutation-types';

export const ActionGetActive = async ({ dispatch, commit }) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .detalharAtivo()
        .then(doc => {
            commit(types.SET_ACTIVE_TASK, doc)
            if (doc) {
                dispatch('ActionActiveSomaTimes', doc.id)
            }
            return doc;
        })
}

export const ActionFilterRecenteTasks = async ({ commit }) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .listarRecentes()
        .then(doc => {
            commit(types.SET_RECENT_TASKS, doc)
            return doc;
        })
}


export const ActionUpdateActives = async ({ dispatch, commit }, id) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .alterarAtivos(id)
        .then(doc => {
            commit(types.SET_ACTIVE_TASK, doc)
            dispatch('ActionActiveSomaTimes', doc.id)
            return doc
        })
}

export const ActionFilterFinishedTask = async ({ commit }) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .listarFinalizados()
        .then(res => {
            commit(types.SET_FINISHED_TASKS, res)
            return res;
        })
}


export const ActionUpdateStatus = async ({ dispatch }, payload) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .alteraStatus(payload.id, payload.status)
}

export const ActionActiveSomaTimes = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .somaTimes(payload)
        .then(res => commit(types.SET_ACTIVE_SOMA_TIME, res))
}