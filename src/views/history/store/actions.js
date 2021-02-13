// history
import { ConnectionFactory } from '../../../model/connection-factory';
import { NoteDao } from '../../../model/note-dao';
import { TimeDao } from "../../../model/time-dao";

export const ActionSaveNote = async ({ dispatch }, payload) => {
    return new NoteDao(await ConnectionFactory.getConnection())
        .adiciona(payload)
}

export const ActionSaveTime = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .adiciona(payload)
}

export const ActionListTimes = async ({ commit }, payload) => {
    return new TimeDao(await ConnectionFactory.getConnection())
        .listar(payload)
}

export const ActionListNotes = async ({ commit }, payload) => {
    return new NoteDao(await ConnectionFactory.getConnection())
        .listar(payload)
}
