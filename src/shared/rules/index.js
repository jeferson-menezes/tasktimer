export const required = text => {
    return v => !!v || text
}