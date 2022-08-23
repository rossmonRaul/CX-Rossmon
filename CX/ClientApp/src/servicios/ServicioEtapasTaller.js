import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "etapastaller";

export const AgregarEtapasTaller = async (data) => {
    const url = `${controlador}/insertaretapastaller`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarEtapasTaller  = async (data) => {
    const url = `${controlador}/actualizaretapastaller`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarEtapasTaller  = async (id) => {
    const url = `${controlador}/eliminaretapastaller?idEtapaTaller=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerEtapasTallerPorId = async (id) => {
    const url = `${controlador}/obteneretapastallerporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerEtapasTaller  = async () => {
    const url = `${controlador}/Obteneretapastaller`;
    return await ProcesarDatosApi('GET', url);
}
