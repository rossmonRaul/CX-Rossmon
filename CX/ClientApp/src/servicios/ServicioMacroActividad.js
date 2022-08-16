import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "macroactividad";

export const AgregarMacroActividad = async (data) => {
    const url = `${controlador}/insertarmacroactividad`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarMacroActividad = async (data) => {
    const url = `${controlador}/actualizarmacroactividad`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarMacroActividad = async (id) => {
    const url = `${controlador}/eliminarmacroactividad?idMacro=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerMacroActividadPorId = async (id) => {
    const url = `${controlador}/obtenermacroactividadporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerMacroActividad = async () => {
    const url = `${controlador}/Obtenermacroactividad`;
    return await ProcesarDatosApi('GET', url);
}