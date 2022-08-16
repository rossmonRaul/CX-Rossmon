import { ProcesarDatosApi } from "./ApiFetch";
const controlador = "sectores";

export const ObtenerSectores = async () => {
    const url = `${controlador}/ObtenerSectores`;
    return await ProcesarDatosApi('GET', url);
}

export const ObtenerSectoresActivos = async () => {
    const url = `${controlador}/ObtenerSectoresActivos`;
    return await ProcesarDatosApi('GET', url);
}

export const AgregarSectores = async (data) => {
    const url = `${controlador}/insertarsectores`;
    return await ProcesarDatosApi('POST', url, data);
}


export const ActualizarSector = async (data) => {
    const url = `${controlador}/ActualizarSector`;
    return await ProcesarDatosApi('PUT', url, data);
}

export const InactivarSector = async (id) => {
    const url = `${controlador}/eliminarsector?idSector=${id}`;
    return await ProcesarDatosApi('DELETE', url);
}


export const ObtenerSectorPorId = async (id) => {
    const url = `${controlador}/ObtenerSectorPorID/${id}`;
    return await ProcesarDatosApi('GET', url);
}

