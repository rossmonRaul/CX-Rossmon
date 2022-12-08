import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "mantenimientohallazgo";


export const AgregarGradoImpacto = async (data) => {
    const url = `${controlador}/insertargradoimpacto`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ObtenerCantidadMantenimientoHallazgo = async () => {
    const url = `${controlador}/ObtenerCantidadMantenimientoHallazgo`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerDatosOrbe = async () => {
    const url = `${controlador}/ObtenerDatosOrbe`;
    return await ProcesarDatosApi('GET', url);
}