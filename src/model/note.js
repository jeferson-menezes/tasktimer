export class Note {

    constructor(texto, data, taskId, id = null) {
        this._texto = texto;
        this._data = data
        this._taskId = taskId;
        this._id = id
    }

    get id() {
        return this._id
    }

    get texto() {
        return this._texto
    }

    get data() {
        return this._data
    }

    get taskId() {
        return this._taskId
    }
}