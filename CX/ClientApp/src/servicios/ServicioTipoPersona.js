import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipopersona";

export const ObtenerTiposPersona = async () => {
    const url = `${controlador}/ObtenerTiposPersona`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTiposPersonaActivos = async () => {
    const url = `${controlador}/ObtenerTiposPersonaActivos`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarTipoPersona = async (data) => {
    const url = `${controlador}/insertarTipoPersona`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoPersona = async (data) => {
    const url = `${controlador}/ActualizarTipoPersona`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoPersona = async (id) => {
    const url = `${controlador}/eliminartipoPersona?idTipoPersona=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerTipoPersonaPorId = async (id) => {
    const url = `${controlador}/ObtenerTipoPersonaPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}