import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "serviciolineanegocio";

export const ObtenerServicioLineaNegocio = async () => {
    const url = `${controlador}/ObtenerServicioLineaNegocio`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerLineasNegociosActivos= async () => {
    const url = `${controlador}/ObtenerLineasNegociosActivos`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarServicioLineaNegocio = async (data) => {
    const url = `${controlador}/insertarserviciolineanegocio`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarServicioLineaNegocio = async (data) => {
    const url = `${controlador}/ActualizarServicioLineaNegocio`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarServicioLineaNegocio = async (id) => {
    const url = `${controlador}/eliminarserviciolineanegocio?idServicio=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerServicioLineaNegocioPorId = async (id) => {
    const url = `${controlador}/ObtenerServicioLineaNegocioPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

