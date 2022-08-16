import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "periodicidad";

export const AgregarPeriodicidad = async (data) => {
    const url = `${controlador}/insertarPeriodicidad`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarPeriodicidad = async (data) => {
    const url = `${controlador}/actualizarPeriodicidad`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarPeriodicidad = async (id) => {
    const url = `${controlador}/eliminarPeriodicidad?idPeriodicidad=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerPeriodicidadPorId = async (id) => {
    const url = `${controlador}/obtenerPeriodicidadporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerPeriodicidad = async () => {
    const url = `${controlador}/ObtenerPeriodicidad`;
    return await ProcesarDatosApi('GET', url);
}