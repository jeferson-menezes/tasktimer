// task
import colors from '@/localbase/data/colors.json';
import { ConnectionFactory } from '../../../model/connection-factory';
import { TaskDao } from '../../../model/task-dao';

export const ActionListColors = ({ dispatch }) => {
    return new Promise((resolve, reject) => {
        const cores = colors.map(c => { return { name: c.name, id: c.id } })
        resolve(cores)
    })
}

export const ActionListPalette = ({ dispatch }, payload) => {
    return new Promise((resolve, reject) => {
        const paleta = colors.filter(c => c.name === payload)[0].paleta
        resolve(paleta)
    })
}

// Tasks

export const ActionSaveTask = async ({ dispatch }, payload) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .adiciona(payload)
}

export const ActionDetailTask = async ({ commit }, payload) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .detalhar(payload)
}

export const ActionDeleteTask = async ({ commit }, payload) => {
    return new TaskDao(await ConnectionFactory.getConnection())
        .excluir(payload)
}