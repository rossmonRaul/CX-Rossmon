using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioParticipantesEquipoTrabajo
    {
        Task<DtoRespuestaSP> InsertarParticipanteEquipoTrabajo(EntitiParticipanteEquipoTrabajo entitiParticipante);

        Task<DtoRespuestaSP> ActualizarParticipante(EntitiParticipanteEquipoTrabajo entitiParticipante);

        Task<DtoParticipanteEquipoTrabajo> ObtenerParticipantePorID(int idParticipante);

        Task<List<DtoParticipanteEquipoTrabajo>> ObtenerEquipoTrabajoPorIdTaller(int idTallerCoCreacion);

        Task<DtoRespuestaSP> EliminarParticipante(int idParticipante);


    }
}
