import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipointeraccion";

export const AgregarTipoInteraccion = async (data) => {
    const url = `${controlador}/insertartipointeraccion`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoInteraccion = async (data) => {
    const url = `${controlador}/actualizartipointeraccion`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoInteraccion = async (id) => {
    const url = `${controlador}/eliminartipointeraccion?idTipoInteraccion=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoInteraccionPorId = async (id) => {
    const url = `${controlador}/obtenertipointeraccionporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTipoInteraccion = async () => {
    const url = `${controlador}/obtenertipointeraccion`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTipoInteraccionActivos = async () => {
    const url = `${controlador}/obtenertipointeraccionactivos`;
    return await ProcesarDatosApi('GET', url);
}
