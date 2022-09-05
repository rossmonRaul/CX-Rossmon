import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "socio";

export const ObtenerSocios = async () => {
    const url = `${controlador}/ObtenerSocios`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerSociosActivos = async () => {
    const url = `${controlador}/ObtenerSociosActivos`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarSocio = async (data) => {
    const url = `${controlador}/insertarSocio`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarSocio = async (data) => {
    const url = `${controlador}/ActualizarSocio`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarSocio = async (id) => {
    const url = `${controlador}/eliminarsocio?idSocio=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerSocioPorId = async (id) => {
    const url = `${controlador}/ObtenerSocioPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTiposPersona = async () => {
    const url = `${controlador}/ObtenerTiposPersona`;
    return await ProcesarDatosApi('GET', url);
}