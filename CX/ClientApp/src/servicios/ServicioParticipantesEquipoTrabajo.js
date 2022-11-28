import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "participante";


export const InsertarParticipanteEquipoTrabajo = async (data) => {
    const url = `${controlador}/InsertarParticipanteEquipoTrabajo`;
    return await ProcesarDatosApi('POST', url, data);
}

export const ActualizarParticipante = async (data) => {
    const url = `${controlador}/ActualizarParticipante`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const EliminarParticipante = async (id) => {
    const url = `${controlador}/EliminarParticipante?idParticipante=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerParticipantePorID = async (id) => {
    const url = `${controlador}/ObtenerParticipantePorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerEquipoTrabajoPorIdTaller = async (id) => {
    const url = `${controlador}/ObtenerEquipoTrabajoPorIdTaller/${id}`;
    return await ProcesarDatosApi('GET', url);
}
