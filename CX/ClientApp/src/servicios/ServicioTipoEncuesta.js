import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipoencuesta";

export const AgregarTipoEncuesta = async (data) => {
    const url = `${controlador}/InsertarTipoEncuesta`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoEncuesta = async (data) => {
    const url = `${controlador}/ActualizarTipoEncuesta`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoEncuesta = async (id) => {
    const url = `${controlador}/EliminarTipoEncuesta?idTipoEncuesta=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoEncuestaPorId = async (id) => {
    const url = `${controlador}/ObtenerTipoEncuestaPorId/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTiposEncuestas = async () => {
    const url = `${controlador}/ObtenerTiposEncuestas`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTiposEncuestasActivos = async () => {
    const url = `${controlador}/ObtenerTipoEncuestaActivos`;
    return await ProcesarDatosApi('GET', url);
}
