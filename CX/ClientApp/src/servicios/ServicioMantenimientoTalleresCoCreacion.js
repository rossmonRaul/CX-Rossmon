import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "mantenimientoTalleresCoCreacion";

export const ObtenerCantidadMantenimientoTalleresCoCreacion = async () => {
    const url = `${controlador}/ObtenerCantidadMantenimientoTalleresCoCreacion`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerDatosOrbe = async () => {
    const url = `${controlador}/ObtenerDatosOrbe`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerMantenimientoTallerCoCreacion = async () => {
    const url = `${controlador}/ObtenerMantenimientoTallerCoCreacion`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerEtapasTallerCoCreacion = async (id) => {
    const url = `${controlador}/ObtenerEtapasTallerCoCreacion/${id}`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerFechasTallerCoCreacion = async (id) => {
    const url = `${controlador}/ObtenerFechasTallerCoCreacion/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const EliminarMantenimientoTallerCoCreacion = async (id) => {
    const url = `${controlador}/EliminarMantenimientoTallerCoCreacion?idMantenimientoTalleresCoCreacion=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}
export const ObtenerMantenimientoTallerCoCreacionPorID = async (id) => {
    const url = `${controlador}/ObtenerMantenimientoTallerCoCreacionPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const AgregarMantenimientoTallerCoCreacion = async (data) => {
    const url = `${controlador}/AgregarMantenimientoTallerCoCreacion`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarMantenimientoTallerCoCreacion = async (data) => {
    const url = `${controlador}/ActualizarMantenimientoTallerCoCreacion`;
    return await ProcesarDatosApi('PUT', url, data);
}

