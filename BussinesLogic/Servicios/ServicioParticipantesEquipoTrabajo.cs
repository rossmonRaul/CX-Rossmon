using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.ParticipantesEquipoTrabajo;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioParticipantesEquipoTrabajo : IServicioParticipantesEquipoTrabajo
    {
        public readonly IRepositorioParticipantesEquipoTrabajo repositorioParticipantesEquipoTrabajo;

        public ServicioParticipantesEquipoTrabajo(IRepositorioParticipantesEquipoTrabajo repositorioParticipantesEquipoTrabajo)
        {
            this.repositorioParticipantesEquipoTrabajo = repositorioParticipantesEquipoTrabajo;
        }

        public async Task<DtoRespuestaSP> InsertarParticipanteEquipoTrabajo(EntitiParticipanteEquipoTrabajo entitiParticipante)
        {
            return await this.repositorioParticipantesEquipoTrabajo.InsertarParticipanteEquipoTrabajo(entitiParticipante);
        }

        public async Task<DtoRespuestaSP> ActualizarParticipante(EntitiParticipanteEquipoTrabajo entitiParticipanteEquipoTrabajo)
        {
            return await this.repositorioParticipantesEquipoTrabajo.ActualizarParticipante(entitiParticipanteEquipoTrabajo);
        }

        public async Task<DtoParticipanteEquipoTrabajo> ObtenerParticipantePorID(int idParticipante)
        {
            return await this.repositorioParticipantesEquipoTrabajo.ObtenerParticipantePorID(idParticipante);
        }

        public async Task<List<DtoParticipanteEquipoTrabajo>> ObtenerEquipoTrabajoPorIdTaller(int idTallerCoCreacion)
        {
            return await this.repositorioParticipantesEquipoTrabajo.ObtenerEquipoTrabajoPorIdTaller(idTallerCoCreacion);
        }
        public async Task<DtoRespuestaSP> EliminarParticipante(int idParticipantesEquipoTrabajo)
        {
            return await this.repositorioParticipantesEquipoTrabajo.EliminarParticipante(idParticipantesEquipoTrabajo);
        }

    }
}
