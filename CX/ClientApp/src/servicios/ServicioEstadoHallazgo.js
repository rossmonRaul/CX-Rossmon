import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "estadohallazgo";

export const ObtenerEstadoHallazgo = async () => {
    const url = `${controlador}/obtenerestadohallazgo`;
    return await ProcesarDatosApi('GET', url);
}

export const InsertarEstadoHallazgo = async (data) => {
    const url = `${controlador}/insertarestadohallazgo`;
    return await ProcesarDatosApi('POST', url, data);
}
export const ActualizarEstadoHallazgo = async (data) => {
    const url = `${controlador}/actualizarestadohallazgo`;
    return await ProcesarDatosApi('PUT', url, data);
}
export const InactivarEstadoHallazgo = async (id) => {
    const url = `${controlador}/eliminarestadohallazgo?idEstadoHallazgo=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerEstadoHallazgoPorID = async (id) => {
    const url = `${controlador}/ObtenerEstadoHallazgoPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}