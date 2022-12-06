import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "responsable";

export const ObtenerResponsables = async () => {
    const url = `${controlador}/ObtenerResponsables`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerResponsablesActivos = async () => {
    const url = `${controlador}/ObtenerResponsablesActivos`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarResponsable = async (data) => {
    const url = `${controlador}/insertarResponsable`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarResponsable = async (data) => {
    const url = `${controlador}/ActualizarResponsable`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarResponsable = async (id) => {
    const url = `${controlador}/eliminarResponsable?idResponsable=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerResponsablePorId = async (id) => {
    const url = `${controlador}/ObtenerResponsablePorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerResponsablesPorIdHallazgo = async (id) => {
    const url = `${controlador}/ObtenerResponsablesPorIdHallazgo/${id}`;
    return await ProcesarDatosApi('GET', url);
}
