import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "lineanegocio";

export const AgregarLineaNegocio = async (data) => {
    const url = `${controlador}/insertarlineanegocio`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarLineaNegocio = async (data) => {
    const url = `${controlador}/actualizarlineanegocio`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarLineaNegocio = async (id) => {
    const url = `${controlador}/eliminarlineanegocio?idLinea=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerLineaNegocioPorId = async (id) => {
    const url = `${controlador}/obtenerlineanegocioporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerLineaNegocio= async () => {
    const url = `${controlador}/ObtenerLineaNegocio`;
    return await ProcesarDatosApi('GET', url);
}
