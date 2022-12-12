import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "preguntasencuesta";

export const InsertarPreguntaEncuesta = async (data) => {
    const url = `${controlador}/insertarpreguntaencuesta`;
    return await ProcesarDatosApi('POST', url, data);
}

export const InactivarPreguntaEncuesta = async (id) => {
    const url = `${controlador}/eliminarpreguntaencuesta?idPreguntaEncuesta=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerPreguntas = async () => {
    const url = `${controlador}/ObtenerPregunta`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerUltimoIdPreguntas = async () => {
    const url = `${controlador}/ObtenerUltimoIdPregunta`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerPreguntaPorId = async (id) => {
    const url = `${controlador}/obtenerpreguntaporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ActualizarPregunta= async (data) => {
    const url = `${controlador}/actualizarpregunta`;
    return await ProcesarDatosApi('PUT', url, data);
}

