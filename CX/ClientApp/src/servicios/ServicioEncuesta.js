import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "encuesta";

export const ObtenerEncuestas = async () => {
    const url = `${controlador}/ObtenerEncuestas`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerEncuestasActivas = async () => {
    const url = `${controlador}/ObtenerEncuestasActivas`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarEncuesta = async (data) => {
    const url = `${controlador}/insertarEncuesta`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarEncuesta = async (data) => {
    const url = `${controlador}/ActualizarEncuesta`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarEncuesta = async (id) => {
    const url = `${controlador}/eliminarEncuesta?idEncuesta=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerEncuestaPorId = async (id) => {
    const url = `${controlador}/ObtenerEncuestaPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ValidarToken = async (token) => {
    const url = `${controlador}/ValidarToken/${token}`;
    return await ProcesarDatosApi('GET', url);
}