import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "fasescj";

export const AgregarFasesCJ = async (data) => {
    const url = `${controlador}/insertarfasescj`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarFasesCJ = async (data) => {
    const url = `${controlador}/actualizarfasescj`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarFasesCJ = async (id) => {
    const url = `${controlador}/eliminarfasescj?idFasesCJ=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerFasesCJPorId = async (id) => {
    const url = `${controlador}/obtenerfasescjporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerFasesCJ = async () => {
    const url = `${controlador}/obtenerfasescj`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerFasesCJActivos = async () => {
    const url = `${controlador}/obtenerfasescjactivos`;
    return await ProcesarDatosApi('GET', url);
}
