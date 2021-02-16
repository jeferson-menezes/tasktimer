// home
import { ConnectionFactory } from '../../../model/connection-factory';
import { TaskDao } from '../../../model/task-dao';
import * as types from './mutation-types';

export const ActionGetActive = async ({ commit }, payload) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .detalharAtivo()
        .then(doc => {
            commit(types.SET_ACTIVE_TASK, doc)
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


export const ActionUpdateActives = async ({ commit }, id) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .alterarAtivos(id)
        .then(doc => {
            commit(types.SET_ACTIVE_TASK, doc)
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