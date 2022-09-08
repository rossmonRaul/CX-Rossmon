import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipocontactoencuesta";

export const AgregarTipoContactoEncuesta = async (data) => {
    const url = `${controlador}/insertartipocontactoencuesta`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoContactoEncuesta = async (data) => {
    const url = `${controlador}/actualizartipocontactoencuesta`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoContactoEncuesta = async (id) => {
    const url = `${controlador}/eliminartipocontactoencuesta?idTipoContactoEncuesta=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoContactoEncuestaPorId = async (id) => {
    const url = `${controlador}/obtenertipocontactoencuestaporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTipoContactoEncuesta = async () => {
    const url = `${controlador}/obtenertipocontactoencuesta`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTipoContactoEncuestaActivos = async () => {
    const url = `${controlador}/obtenertipocontactoencuestaactivos`;
    return await ProcesarDatosApi('GET', url);
}
