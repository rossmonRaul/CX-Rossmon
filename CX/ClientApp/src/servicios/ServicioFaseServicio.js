import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "faseservicio";

export const ObtenerFaseServicio= async () => {
    const url = `${controlador}/obtenerfaseservicio`;
    return await ProcesarDatosApi('GET', url);
}

export const InsertarFaseServicio = async (data) => {
    const url = `${controlador}/insertarfaseservicio`;
    return await ProcesarDatosApi('POST', url, data);
}
export const ActualizarFaseServicio = async (data) => {
    const url = `${controlador}/actualizarfaseservicio`;
    return await ProcesarDatosApi('PUT', url, data);
}
export const InactivarFaseServicio = async (id) => {
    const url = `${controlador}/eliminarfaseservicio?idFase=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerFaseServicioPorId = async (id) => {
    const url = `${controlador}/ObtenerFaseServicioPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}