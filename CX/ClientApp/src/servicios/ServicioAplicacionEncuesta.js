import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "aplicacionencuesta";

export const InsertarUsuarioEncuesta = async (data) => {
    const url = `${controlador}/InsertarUsuarioEncuesta`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarUsuarioEncuesta = async (data) => {
    const url = `${controlador}/ActualizarUsuarioEncuesta`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const EliminarUsuarioEncuesta = async (id) => {
    const url = `${controlador}/EliminarUsuarioEncuesta?IdUsuarioEncuesta =${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerUsuarioEncuestaPorTelefonoOCorreo = async (telefono,correo) => {
    const url = `${controlador}/ObtenerUsuarioEncuestaPorTelefonoOCorreo/${telefono}/${correo}`;
    return await ProcesarDatosApi('GET', url);
}
