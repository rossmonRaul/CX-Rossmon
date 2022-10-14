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