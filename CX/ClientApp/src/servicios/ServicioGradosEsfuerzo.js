import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "gradosesfuerzo";

export const ObtenerGradosEsfuerzo = async () => {
    const url = `${controlador}/ObtenerGradosEsfuerzo`;
    return await ProcesarDatosApi('GET', url);
}

export const AgregarGradosEsfuerzo = async (data) => {
    const url = `${controlador}/insertargradosesfuerzo`;
    return await ProcesarDatosApi('POST', url, data);
}
export const ActualizarGradoEsfuerzo = async (data) => {
    const url = `${controlador}/ActualizarGradoEsfuerzo`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarGradoEsfuerzo = async (id) => {
    const url = `${controlador}/EliminarGradoEsfuerzo?idGradoEsfuerzo=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerGradoEsfuerzoPorID = async (id) => {
    const url = `${controlador}/ObtenerGradoEsfuerzoPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}


