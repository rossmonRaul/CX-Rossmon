import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tallercocreacion";

export const ObtenerTalleresCoCreacion = async () => {
    const url = `${controlador}/ObtenerTalleresCoCreacion`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTalleresCoCreacionActivos = async () => {
    const url = `${controlador}/ObtenerTalleresCoCreacionActivos`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarTallerCoCreacion = async (data) => {
    const url = `${controlador}/insertarTallerCoCreacion`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTallerCoCreacion = async (data) => {
    const url = `${controlador}/ActualizarTallerCoCreacion`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTallerCoCreacion = async (id) => {
    const url = `${controlador}/eliminarTallerCoCreacion?idTallerCoCreacion=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTallerCoCreacionPorId = async (id) => {
    const url = `${controlador}/ObtenerTallerCoCreacion/${id}`;
    return await ProcesarDatosApi('GET', url);
}