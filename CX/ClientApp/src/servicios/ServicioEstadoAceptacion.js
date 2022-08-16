import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "estadoaceptacion";

export const ObtenerEstadoAceptacion = async () => {
    const url = `${controlador}/obtenerestadoaceptacion`;
    return await ProcesarDatosApi('GET', url);
}

export const InsertarEstadoAceptacion = async (data) => {
    const url = `${controlador}/insertarestadoaceptacion`;
    return await ProcesarDatosApi('POST', url, data);
}
export const ActualizarEstadoAceptacion = async (data) => {
    const url = `${controlador}/actualizarestadoaceptacion`;
    return await ProcesarDatosApi('PUT', url, data);
}
export const InactivarEstadoAceptacion = async (id) => {
    const url = `${controlador}/eliminarestadoaceptacion?idEstadoAceptacion=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerEstadoAceptacionPorID = async (id) => {
    const url = `${controlador}/ObtenerEstadoAceptacionPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}