import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipotaller";

export const AgregarTipoTaller = async (data) => {
    const url = `${controlador}/insertartipotaller`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoTaller = async (data) => {
    const url = `${controlador}/actualizartipotaller`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoTaller = async (id) => {
    const url = `${controlador}/eliminartipotaller?idTipoTaller=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoTallerPorId = async (id) => {
    const url = `${controlador}/obtenertipotallerporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTipoTaller = async () => {
    const url = `${controlador}/Obtenertipotaller`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTipoTallerActivos = async () => {
    const url = `${controlador}/Obtenertipotalleractivos`;
    return await ProcesarDatosApi('GET', url);
}
