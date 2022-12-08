import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "respuestaspreguntaencuesta";

export const ObtenerRespuestasPreguntaEncuestaPorId = async (id) => {
    const url = `${controlador}/obtenerrespuestaspreguntaporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}
//EL = SERIA PARA ELIMINAR

export const AgregarRespuestaPreguntaEncuesta = async (data) => {
    const url = `${controlador}/insertarrespuestapreguntaencuesta`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarRespuestasPreguntaEncuesta = async (data) => {
    const url = `${controlador}/actualizarrespuestaspreguntaencuesta`;
    return await ProcesarDatosApi('PUT', url, data);
}