import models from './models'

const stores = [
    { name: models.task, indexs: ['_status', '_nome'], autoIncrement: true },
    { name: models.note, indexs: ['_taskId'], autoIncrement: true },
    { name: models.time, indexs: ['_taskId'], autoIncrement: true },
    { name: models.config, indexs: [], autoIncrement: false, key: '_key' }

]
const version = 1
const dbName = 'tasktime'
let connection = null

export class ConnectionFactory {

    constructor() {
        throw new Error("Não é possível criar instancia de connectionFactory")
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e);
            }

            openRequest.onsuccess = e => {
                if (!connection) connection = e.target.result;
                resolve(connection)
            }

            openRequest.onerror = e => {
                console.log(e.target.error)
                reject(e.target.error.name)
            }
        })
    }

    static _createStores(e) {

        stores.forEach(store => {

            if (e.target.result.objectStoreNames.contains(store.name)) {
                e.target.result.deleteObjectStore(store.name)
            }

            let object = null;

            if (store.autoIncrement) {
                object = e.target.result.createObjectStore(store.name, { autoIncrement: true });
            } else {
                object = e.target.result.createObjectStore(store.name, { keyPath: store.key });
            }

            store.indexs.forEach(i => {
                object.createIndex(i, i, { unique: false })
            })
        })
    }
}