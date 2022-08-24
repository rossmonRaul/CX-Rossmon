import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "gradoimpacto";

export const AgregarGradoImpacto = async (data) => {
    const url = `${controlador}/insertargradoimpacto`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarGradoImpacto = async (data) => {
    const url = `${controlador}/actualizargradoimpacto`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarGradoImpacto = async (id) => {
    const url = `${controlador}/eliminargradoimpacto?idGradoImpacto=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerGradoImpactoPorId = async (id) => {
    const url = `${controlador}/obtenergradoimpactoporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerGradoImpacto = async () => {
    const url = `${controlador}/Obtenergradoimpacto`;
    return await ProcesarDatosApi('GET', url);
}
