import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "metodologiacx";

export const AgregarMetodologiaCX = async (data) => {
    const url = `${controlador}/insertarmetodologiacx`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarMetodologiaCX = async (data) => {
    const url = `${controlador}/actualizarmetodologiacx`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarMetodologiaCX = async (id) => {
    const url = `${controlador}/eliminarmetodologiacx?idMetodologia=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerMetodologiaCXPorId = async (id) => {
    const url = `${controlador}/obtenermetodologiacxporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerMetodologiaCX = async () => {
    const url = `${controlador}/Obtenermetodologiacx`;
    return await ProcesarDatosApi('GET', url);
}