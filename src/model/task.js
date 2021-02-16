export class Task {

    constructor(nome, codigo, status, bg, data, color, id = null) {
        this._nome = nome;
        this._codigo = codigo;
        this._status = status;
        this._bg = bg;
        this._data = data
        this._color = color
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

    get bg() {
        return this._bg
    }

    get color() {
        return this._color
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