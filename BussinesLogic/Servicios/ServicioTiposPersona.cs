using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTiposPersona 
    {
        public SPTiposPersona spTiposPersona = new SPTiposPersona();

        public async Task<List<DtoTipoPersona>> ObtenerTiposPersona()
        {
            return await this.spTiposPersona.ObtenerTiposPersona();
        }

        public async Task<DtoRespuestaSP> InsertarTiposPersona(EntitiTipoPersona entitiTiposPersona)
        {
            return await this.spTiposPersona.InsertarTiposPersona(entitiTiposPersona);
        }

        public async Task<DtoRespuestaSP> ActualizarTipoPersona(EntitiTipoPersona entitiTipoPersona)
        {
            return await this.spTiposPersona.ActualizarTipoPersona(entitiTipoPersona);
        }

        public async Task<DtoTipoPersona> ObtenerTipoPersonaPorID(int idTipoPersona)
        {
            return await this.spTiposPersona.ObtenerTipoPersonaPorId(idTipoPersona);
        }
        public async Task<DtoRespuestaSP> EliminarTipoPersona(int idTiposPersona)
        {
            return await this.spTiposPersona.EliminarTipoPersona(idTiposPersona);
        }

        public async Task<List<DtoTipoPersona>> ObtenerTiposPersonaActivos()
        {
            return await this.spTiposPersona.ObtenerTiposPersonaActivos();
        }
    }
}
