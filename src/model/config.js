export class Config {

    constructor(key, value) {
        this._key = key
        this._value = value
    }

    get key() {
        return this._key
    }

    get value() {
        return this._value
    }
}


export const KeyConfig = {
    THEME_DARK: 'THEME_DARK',
}