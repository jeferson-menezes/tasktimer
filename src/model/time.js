export class Time {

    constructor(tempo, inicio, fim, taskId, id = null) {
        this._tempo = tempo
        this._inicio = inicio;
        this._fim = fim;
        this._taskId = taskId;
        this._id = id
    }

    get tempo() {
        return this._tempo;
    }
    
    get inicio() {
        return this._inicio;
    }

    get fim() {
        return this._fim;
    }

    get taskId() {
        return this._taskId;
    }

    get id() {
        return this._id;
    }
}