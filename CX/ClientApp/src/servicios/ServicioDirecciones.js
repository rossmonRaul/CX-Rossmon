import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "direcciones";

export const ObtenerDirecciones = async () => {
    const url = `${controlador}/ObtenerDirecciones`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerDireccionesActivas = async () => {
    const url = `${controlador}/ObtenerDireccionesActivas`;
    return await ProcesarDatosApi('GET', url);
}


export const AgregarDirecciones = async (data) => {
    const url = `${controlador}/insertardirecciones`;
    return await ProcesarDatosApi('POST', url, data);
}


export const ActualizarDireccion = async (data) => {
    const url = `${controlador}/ActualizarDireccion`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarDireccion = async (id) => {
    const url = `${controlador}/EliminarDireccion?idDireccion=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerDireccionPorID = async (id) => {
    const url = `${controlador}/ObtenerDireccionPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

