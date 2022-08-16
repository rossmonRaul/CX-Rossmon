import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "segmentos";

export const ObtenerSegmentos = async () => {
    const url = `${controlador}/ObtenerSegmentos`;
    return await ProcesarDatosApi('GET', url);
}

export const AgregarSegmentos = async (data) => {
    const url = `${controlador}/insertarsegmentos`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarSegmento = async (data) => {
    const url = `${controlador}/ActualizarSegmentos`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarSegmento = async (id) => {
    const url = `${controlador}/eliminarsegmento?idSegmento=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerSegmentoPorId = async (id) => {
    const url = `${controlador}/ObtenerSegmentoPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

