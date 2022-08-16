import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "gradosesfuerzo";

export const ObtenerGradosEsfuerzo = async () => {
    const url = `${controlador}/ObtenerGradosEsfuerzo`;
    return await ProcesarDatosApi('GET', url);
}

export const AgregarGradosEsfuerzo = async (data) => {
    const url = `${controlador}/insertargradosesfuerzo`;
    return await ProcesarDatosApi('POST', url, data);
}

