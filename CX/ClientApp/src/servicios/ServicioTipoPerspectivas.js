import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "tipoperspectivas";

export const AgregarTipoPerspectivas = async (data) => {
    const url = `${controlador}/insertartipoperspectivas`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarTipoPerspectivas = async (data) => {
    const url = `${controlador}/actualizartipoperspectivas`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarTipoPerspectivas = async (id) => {
    const url = `${controlador}/eliminartipoperspectivas?idTipoPerspectivas=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerTipoPerspectivasPorId = async (id) => {
    const url = `${controlador}/obtenertipoperspectivasporid/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerTipoPerspectivas = async () => {
    const url = `${controlador}/obtenertipoperspectivas`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerTipoPerspectivasActivos = async () => {
    const url = `${controlador}/obtenertipoperspectivasactivos`;
    return await ProcesarDatosApi('GET', url);
}
