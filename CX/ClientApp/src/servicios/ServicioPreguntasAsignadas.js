import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "preguntasasignadas";

export const AsignarPregunta = async (data) => {
    const url = `${controlador}/asignarpregunta`;
    return await ProcesarDatosApi('POST', url, data);
}

export const DesasignarPregunta = async (id) => {
    const url = `${controlador}/desasignarpregunta?idAsignacion=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}

export const ObtenerPreguntasPorIdEncuesta = async (idEncuesta) => {
    const url = `${controlador}/obtenerpreguntasporidencuesta/${idEncuesta}`;
    return await ProcesarDatosApi('GET', url);
}

