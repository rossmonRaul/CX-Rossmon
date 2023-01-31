import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "cliente";

export const ObtenerClientes = async () => {
    const url = `${controlador}/ObtenerClientes`;
    return await ProcesarDatosApi('GET', url);
}
export const ObtenerClientesActivos = async () => {
    const url = `${controlador}/ObtenerClientesActivos`;
    return await ProcesarDatosApi('GET', url);
}
export const AgregarCliente = async (data) => {
    const url = `${controlador}/insertarCliente`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarCliente = async (data) => {
    const url = `${controlador}/ActualizarCliente`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarCliente = async (id) => {
    const url = `${controlador}/eliminarsocio?idCliente=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerClientePorId = async (id) => {
    const url = `${controlador}/ObtenerClientePorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}