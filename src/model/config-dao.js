import { Config } from './config';
import models from './models';

export class ConfigDao {

    constructor(connection) {
        this._connection = connection;
        this._store = models.config
    }


    get(key) {
        return new Promise((resolve, reject) => {

            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.get(key)

            request.onsuccess = e => {
                const c = e.target.result
                if (c)
                    resolve(this._createConfig(c))
                else
                    resolve(undefined)
            }

            request.onerror = e => {
                console.log(e);
                reject()
            }
        })
    }

    set(config) {

        return new Promise((resolve, reject) => {

            const store = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)

            const request = store.put(config)

            request.onsuccess = e => {
                resolve(config)
            }

            request.onerror = e => {
                console.log(e);
                reject()
            }
        })
    }

    _createConfig(c) {
        return new Config(c._key, c._value)
    }
}