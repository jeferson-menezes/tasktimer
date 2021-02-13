
export class DbHelper {

    static withAdd(res, model) {
        return JSON.parse(res.replace(`Success: Document added to "${model}" collection:`, ''))
    }

    static withUpdate(res, model, key){
        return JSON.parse(res.replace(`Success: Document in "${model}" collection with key "${key}" updated to:`,''))
    }
}