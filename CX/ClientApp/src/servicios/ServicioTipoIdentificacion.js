import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipoidentificacion";

export const AgregarTipoIdentificacion = async (data) => {
    const url = `${controlador}/insertartipoidentificacion`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoIdentificacion = async (data) => {
    const url = `${controlador}/actualizartipoidentificacion`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoIdentificacion = async (id) => {
    const url = `${controlador}/eliminartipoidentificacion?idTipoIdentificacion=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoIdentificacionPorId = async (id) => {
    const url = `${controlador}/obtenertipoidentificacionporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTipoIdentificacion = async () => {
    const url = `${controlador}/obtenertipoidentificacion`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTipoIdentificacionActivos = async () => {
    const url = `${controlador}/obtenertipoidentificacionactivos`;
    return await ProcesarDatosApi('GET', url);
}
