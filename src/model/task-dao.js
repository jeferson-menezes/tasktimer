import models from './models';
import { Status, Task } from './task';
import { NoteDao } from './note-dao'
import { TimeDao } from "./time-dao";

export class TaskDao {

    constructor(connection) {
        this._connection = connection;
        this._store = models.task
    }

    adiciona(task) {
        return new Promise((resolve, reject) => {
            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.add(task)

            request.onsuccess = e => {
                const id = e.target.result
                store.get(id).onsuccess = d => {
                    const dado = d.target.result
                    dado._id = id
                    store.put(dado, id)
                    resolve(this._createTask(d))
                }
            }

            request.onerror = e => {
                reject('Não foi possível salvar a Tarefa')
            }
        })
    }

    detalhar(id) {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .get(id)

            request.onsuccess = e => {
                const d = e.target.result
                if (!d) reject('Tarefa não encontrada!')
                else
                    resolve(this._createTask(d))
            }
        })
    }

    detalharAtivo() {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .index('_status')
                .get(Status.ATIVA)

            request.onsuccess = e => {
                const d = e.target.result
                if (!d) resolve(null)
                else
                    resolve(this._createTask(d))
            }

            request.onerror = e => {
                reject("Houve um erro!")
            }
        })
    }

    listarRecentes() {
        return new Promise((resolve, reject) => {

            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .index('_status')
                .openCursor()

            let tasks = []

            request.onsuccess = e => {
                let cursor = e.target.result
                if (cursor) {
                    const d = cursor.value
                    if (cursor.key === Status.RECENTE) {
                        tasks.push(this._createTask(d))
                    }
                    cursor.continue()
                } else {
                    resolve(tasks)
                }
            }

            request.onerror = e => {
                reject("Houve um erro!")
            }
        })
    }

    alterarAtivos(id) {
        return new Promise(async (resolve, reject) => {

            await this._alteraAtivo()

            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.get(id)

            request.onsuccess = e => {
                const d = e.target.result
                if (d) {
                    d._status = Status.ATIVA
                    console.log(d);
                    resolve()
                    // store.put(d, id)
                    // resolve(this._createTask(d))
                } else {
                    reject('Tarefa não encontrada!')
                }
            }

            request.onerror = e => {
                reject("Houve um erro!")
            }
        })
    }

    alteraStatus(id, status) {
        return new Promise(async (resolve, reject) => {

            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.get(id)

            request.onsuccess = e => {
                const d = e.target.result
                if (d) {
                    d._status = status
                    store.put(d, id)
                    resolve(this._createTask(d))
                } else {
                    reject('Tarefa não encontrada!')
                }
            }
        })
    }

    listarFinalizados() {
        return new Promise((resolve, reject) => {

            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const index = store.index('_status')

            const request = index.openCursor(IDBKeyRange.only(Status.CONCLUIDO))

            const tasks = []

            request.onsuccess = e => {
                const cursor = request.result

                if (cursor) {
                    tasks.push(this._createTask(cursor.value))
                    cursor.continue()
                } else {
                    resolve(tasks)
                }
            }

            request.onerror = e => {
                reject('Houve um erro')
            }
        })
    }

    excluir(id) {

        return new Promise(async (resolve, reject) => {

            await new NoteDao(this._connection).excluirTodos(id)

            await new TimeDao(this._connection).excluirTodos(id)


            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.delete(id)

            request.onsuccess = e => {
                resolve()
            }

            request.onerror = e => {
                reject()
            }
        })
    }

    _alteraAtivo() {
        return new Promise((resolve, reject) => {

            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const index = store.index('_status')

            const request = index.openCursor(IDBKeyRange.only(Status.ATIVA))

            request.onsuccess = e => {
                const cursor = request.result
                if (cursor) {
                    const dado = cursor.value
                    dado._status = Status.RECENTE
                    store.put(dado, cursor.primaryKey)
                    cursor.continue()
                } else {
                    resolve()
                }
            }

            request.onerror = e => {
                reject("Houve um erro!")
            }
        })
    }

    _createTask(d) {
        return new Task(
            d._nome, d._codigo, d._status, d._bg, d._data, d._color, d._id)
    }

}