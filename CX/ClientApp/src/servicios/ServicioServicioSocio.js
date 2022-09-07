import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "serviciosocio";

export const ObtenerServicioSocio = async () => {
    const url = `${controlador}/ObtenerServicioSocio`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerServicioSocioActivos = async () => {
    const url = `${controlador}/ObtenerServicioSocioActivos`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarServicioSocio = async (data) => {
    const url = `${controlador}/insertarServicioSocio`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarServicioSocio = async (data) => {
    const url = `${controlador}/ActualizarServicioSocio`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const ObtenerServicioSocioPorId = async (id) => {
    const url = `${controlador}/ObtenerServicioSocioPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const InactivarServicioSocio = async (id) => {
    const url = `${controlador}/eliminarServicioSocio?idServicioSocio=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}



