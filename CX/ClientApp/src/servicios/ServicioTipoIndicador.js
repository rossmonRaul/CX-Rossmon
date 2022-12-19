import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipoindicador";

export const AgregarTipoIndicador = async (data) => {
    const url = `${controlador}/InsertarTipoIndicador`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoIndicador = async (data) => {
    const url = `${controlador}/ActualizarTipoIndicador`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const ActualizarValorIndicador = async (data) => {
    const url = `${controlador}/ActualizarValorIndicador`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoIndicador = async (id) => {
    const url = `${controlador}/EliminarTipoIndicador?idTipoIndicador=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoIndicadorPorId = async (id) => {
    const url = `${controlador}/ObtenerTipoIndicadorPorId/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTiposIndicadores = async () => {
    const url = `${controlador}/ObtenerTiposIndicadores`; 
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerValoresIndicadorPorID = async (id) => {
    const url = `${controlador}/ObtenerValoresIndicadorPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTiposIndicadoresActivos = async () => {
    const url = `${controlador}/ObtenerTiposIndicadoresActivos`;
    return await ProcesarDatosApi('GET', url);
}


