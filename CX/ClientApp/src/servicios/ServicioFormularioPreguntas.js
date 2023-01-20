import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "formulariopreguntas";

export const ObtenerPreguntaRespuestaPorID = async (id) => {
    const url = `${controlador}/ObtenerPreguntaRespuestaPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}
