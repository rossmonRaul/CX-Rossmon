﻿import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "etapasTallerCo";

export const AgregarEtapaTallerCo = async (data) => {
    const url = `${controlador}/AgregarEtapaTallerCo`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarEtapaTallerCo = async (data) => {
    const url = `${controlador}/ActualizarEtapaTallerCo`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const ObtenerEtapaTallerCoPorID = async (id) => {
    const url = `${controlador}/ObtenerEtapaTallerCoPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerEtapasTallerCo = async (id) => {
    const url = `${controlador}/ObtenerEtapasTallerCo/${id}`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerFechasTallerCo = async (id) => {
    const url = `${controlador}/ObtenerFechasTallerCo/${id}`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerCantidadEtapasTallerCo = async () => {
    const url = `${controlador}/ObtenerCantidadEtapasTallerCo`;
    return await ProcesarDatosApi('GET', url);
}