import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "mantenimientohallazgo";

export const ObtenerCantidadMantenimientoHallazgo = async () => {
    const url = `${controlador}/ObtenerCantidadMantenimientoHallazgo`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerDatosOrbe = async () => {
    const url = `${controlador}/ObtenerDatosOrbe`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerGridMantenimiento = async () => {
    const url = `${controlador}/ObtenerGridMantenimientoHallazgo`;
    return await ProcesarDatosApi('GET', url);
}
export const InactivarMantenimientoHallazgo = async (id) => {
    const url = `${controlador}/EliminarMantenimientoHallazgo?idMantenimientoHallazgo=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}
export const ObtenerMantenimientoHallazgoPorID = async (id) => {
    const url = `${controlador}/ObtenerMantenimientoHallazgoPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const AgregarMantenimientoHallazgo = async (data) => {
    const url = `${controlador}/agregarmantenimientohallazgo`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarMantenimientoHallazgo = async (data) => {
    const url = `${controlador}/actualizarmantenimientohallazgo`;
    return await ProcesarDatosApi('PUT', url, data);
}