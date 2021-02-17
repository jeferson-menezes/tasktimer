import currency from 'currency.js';
import models from './models';
import { Time } from './time';
import { segundosParaTempo, tempoParaSegundos } from "../helper/timer-helper";

export class TimeDao {

    constructor(connection) {
        this._connection = connection;
        this._store = models.time
    }

    adiciona(time) {
        return new Promise((resolve, reject) => {

            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.add(time)

            request.onsuccess = e => {
                const id = e.target.result
                store.get(id).onsuccess = d => {
                    const dado = d.target.result
                    dado._id = id
                    store.put(dado, id)
                    resolve(this._createTime(d))
                }
            }

            request.onerror = e => {
                reject('Não foi possível salvar a o Tempo')
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

            let times = []

            request.onsuccess = e => {
                const cursor = request.result
                if (cursor) {
                    times.push(this._createTime(cursor.value))
                    cursor.continue()
                } else {
                    resolve(times)
                }
            }

            request.onerror = e => {
                reject('Houve um erro')
            }
        })
    }

    excluir(id) {

        return new Promise((resolve, reject) => {

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

    excluirTodos(taskId) {
        return new Promise((resolve, reject) => {
            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const index = store.index('_taskId')

            const request = index.openCursor(IDBKeyRange.only(taskId))

            request.onsuccess = async e => {
                const cursor = request.result
                if (cursor) {
                    const id = cursor.value._id
                    await store.delete(id)
                    cursor.continue()
                } else {
                    resolve()
                }
            }

            request.onerror = e => {
                reject('Houve um erro')
            }
        })
    }

    totalTimes(taskId) {

        return new Promise((resolve, reject) => {
            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const index = store.index('_taskId')

            const request = index.openCursor(IDBKeyRange.only(taskId))

            let total = 0

            request.onsuccess = e => {
                const cursor = e.target.result
                if (cursor) {
                    total++
                    cursor.continue()
                } else {
                    resolve(total)
                }
            }

            request.onerror = e => {
                reject('Houve um erro')
            }
        })
    }

    somaTimes(taskId) {
        return new Promise((resolve, reject) => {
            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const index = store.index('_taskId')

            const request = index.openCursor(IDBKeyRange.only(taskId))

            let total = currency(0)

            request.onsuccess = e => {
                const cursor = e.target.result
                if (cursor) {
                    const tempo = cursor.value._tempo
                    const segundos = tempoParaSegundos(tempo)
                    total = total.add(segundos)
                    cursor.continue()
                } else {
                    resolve(segundosParaTempo(total.value))
                }
            }

            request.onerror = e => {
                reject('Houve um erro')
            }
        })
    }

    _createTime(time) {
        return new Time(time._tempo, time._inicio, time._fim, time._taskId, time._id)
    }
}
