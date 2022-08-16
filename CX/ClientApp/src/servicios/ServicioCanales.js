import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "canales";

export const ObtenerCanales = async () => {
    const url = `${controlador}/obtenercanales`;
    return await ProcesarDatosApi('GET', url);
}

export const InsertarCanales = async (data) => {
    const url = `${controlador}/insertarcanales`;
    return await ProcesarDatosApi('POST', url, data);
}
export const ActualizarCanales = async (data) => {
    const url = `${controlador}/actualizarcanales`;
    return await ProcesarDatosApi('PUT', url, data);
}
export const InactivarCanales = async (id) => {
    const url = `${controlador}/eliminarcanales?idCanal=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerCanalesPorID = async (id) => {
    const url = `${controlador}/ObtenerCanalesPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}