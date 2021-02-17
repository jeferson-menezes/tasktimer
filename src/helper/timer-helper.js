import moment from "moment";

export const segundosParaTempo = (segundos) =>
    moment()
        .startOf("day")
        .seconds(segundos)
        .format("HH:mm:ss");


export const tempoParaSegundos = (tempo) => moment.duration(tempo).asSeconds();