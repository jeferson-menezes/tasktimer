export class Task {

    constructor(nome, codigo, status, cor, data, id = null) {
        this._nome = nome;
        this._codigo = codigo;
        this._status = status;
        this._cor = cor;
        this._data = data
        this._id = id
    }

    get nome() {
        return this._nome;
    }

    get codigo() {
        return this._codigo;
    }

    get status() {
        return this._status;
    }

    get cor() {
        return this._cor
    }

    get data() {
        return this._data
    }

    get id() {
        return this._id
    }
}

export const Status = {
    CONCLUIDO: 'CONCLUIDO',
    RECENTE: 'RECENTE',
    ATIVA: 'ATIVA'
}