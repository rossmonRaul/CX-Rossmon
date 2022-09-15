import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipometrica";

export const AgregarTipoMetrica = async (data) => {
    const url = `${controlador}/InsertarTipoMetrica`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoMetrica = async (data) => {
    const url = `${controlador}/ActualizarTipoMetrica`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoMetrica = async (id) => {
    const url = `${controlador}/EliminarTipoMetrica?idTipoMetrica=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoMetricaPorId = async (id) => {
    const url = `${controlador}/ObtenerTipoMetricaPorId/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTiposMetricas = async () => {
    const url = `${controlador}/ObtenerTiposMetricas`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTiposMetricasActivos = async () => {
    const url = `${controlador}/ObtenerTipoMetricaActivos`;
    return await ProcesarDatosApi('GET', url);
}
