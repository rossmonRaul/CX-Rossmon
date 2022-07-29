import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "lineanegocio";

export const ObtenerLineaNegocio= async () => {
    const url = `${controlador}/ObtenerLineaNegocio`;
    return await ProcesarDatosApi('GET', url);
}
