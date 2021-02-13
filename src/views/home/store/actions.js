// home
import { ConnectionFactory } from '../../../model/connection-factory';
import { TaskDao } from '../../../model/task-dao';
import { TimeDao } from "../../../model/time-dao";
import * as types from './mutation-types';

export const ActionGetActive = async ({ commit }, payload) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .detalharAtivo()
        .then(doc => commit(types.SET_ACTIVE_TASK, doc))
}

export const ActionFilterRecenteTasks = async ({ commit }) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .listarRecentes()
        .then(doc => commit(types.SET_RECENT_TASKS, doc))
}


export const ActionUpdateActives = async ({ commit }, id) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .alterarAtivos(id)
        .then(doc => commit(types.SET_ACTIVE_TASK, doc))
}

export const ActionFilterFinishedTask = async ({ commit }) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .listarFinalizados()
        .then(res => commit(types.SET_FINISHED_TASKS, res))
}