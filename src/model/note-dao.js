import models from "./models";
import { Note } from "./note";

export class NoteDao {

    constructor(connection) {
        this._connection = connection;
        this._store = models.note
    }

    adiciona(note) {
        return new Promise((resolve, reject) => {
            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.add(note)

            request.onsuccess = e => {
                const id = e.target.result
                store.get(id).onsuccess = d => {
                    const dado = d.target.result
                    dado._id = id
                    store.put(dado, id)

                    resolve(this._createNote(dado))
                }
            }

            request.onerror = e => {
                reject('Não foi possível salvar a nota')
            }
        })
    }


    listar(taskId) {
        return new Promise((resolve, reject) => {
            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const index = store.index('_taskId')

            const request = index.openCursor(IDBKeyRange.only(taskId))

            const notes = []

            request.onsuccess = e => {
                const cursor = request.result

                if (cursor) {
                    notes.push(this._createNote(cursor.value))
                    cursor.continue()
                } else {
                    resolve(notes)
                }
            }

            request.onerror = e => {
                reject('Houve um erro')
            }
        })
    }

    _createNote(note) {
        return new Note(note._texto, note._data, note._taskId)
    }
}