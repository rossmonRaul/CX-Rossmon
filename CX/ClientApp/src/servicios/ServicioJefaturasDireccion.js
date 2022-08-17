import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "jefaturasdireccion";

export const ObtenerJefaturasDireccion = async () => {
    const url = `${controlador}/ObtenerJefaturasDireccion`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerJefaturasDireccionPorId = async (id) => {
    const url = `${controlador}/ObtenerJefaturaDireccionPorId/${id}`;
    return await ProcesarDatosApi('GET', url);
}
export const caragcombo = async () => {
    const url = `${controlador}/Cargacombo`;
    return await ProcesarDatosApi('GET', url);
}
export const EliminarJefaturasDireccion = async (id) => {
    const url = `${controlador}/EliminarJefaturaDireccion?idJefatura=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}
export const InsertarJefaturasDireccion = async (data) => {
    const url = `${controlador}/InsertarJefaturaDireccion`;
    return await ProcesarDatosApi('POST', url,data);
}
export const ActualizarJefaturasDireccion = async (data) => {
    const url = `${controlador}/ActualizarJefatura`;
    return await ProcesarDatosApi('PUT', url,data);
}