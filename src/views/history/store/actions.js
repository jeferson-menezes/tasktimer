// history
import { ConnectionFactory } from '../../../model/connection-factory';
import { NoteDao } from '../../../model/note-dao';
import { TimeDao } from "../../../model/time-dao";

export const ActionSaveNote = async ({ dispatch }, payload) => {
    return new NoteDao(await ConnectionFactory.getConnection())
        .adiciona(payload)
}

export const ActionListNotes = async ({ commit }, payload) => {
    return new NoteDao(await ConnectionFactory.getConnection())
        .listar(payload)
}

export const ActionDeleteNote = async ({ commit }, payload) => {
    return new NoteDao(await ConnectionFactory.getConnection())
        .excluir(payload)
}

export const ActionTotalNotes = async ({ commit }, payload) => {
    return new NoteDao(await ConnectionFactory.getConnection())
        .totalNotes(payload)
}

// times

export const ActionDeleteTime = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .excluir(payload)
}

export const ActionSaveTime = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .adiciona(payload)
}

export const ActionListTimes = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .listar(payload)
}

export const ActionTotalTimes = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .totalTimes(payload)
}

export const ActionSomaTimes = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .somaTimes(payload)
}
