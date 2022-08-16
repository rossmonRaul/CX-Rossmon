import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "categorias";

export const ObtenerCategorias = async () => {
    const url = `${controlador}/ObtenerCategorias`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerCategoriasPorId = async (id) => {
    const url = `${controlador}/ObtenerCategoriasPorId/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const InsertarCategorias = async (Data) => {
    const url = `${controlador}/InsertarCategoria`;
    return await ProcesarDatosApi('POST', url, Data);
}

export const ActualizarCategoria = async (Data) => {
    const url = `${controlador}/ActualizarCategoria`;
    return await ProcesarDatosApi('PUT', url, Data);
}

export const InactivarCategoria = async (id) => {
    const url = `${controlador}/InactivarCategoria?idCategoria=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


