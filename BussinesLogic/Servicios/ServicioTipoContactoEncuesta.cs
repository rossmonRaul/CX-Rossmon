using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoContactoEncuesta
    {
        public SPTipoContactoEncuesta spTipoContactoEncuesta = new SPTipoContactoEncuesta();

        public async Task<DtoRespuestaSP> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            return await this.spTipoContactoEncuesta.InsertarTipoContactoEncuesta(entitiTipoContactoEncuesta);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            return await this.spTipoContactoEncuesta.ActualizarTipoContactoEncuesta(entitiTipoContactoEncuesta);
        }
        public async Task<DtoRespuestaSP> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta)
        {
            return await this.spTipoContactoEncuesta.EliminarTipoContactoEncuesta(idTipoContactoEncuesta);
        }
        public async Task<DtoTipoContactoEncuesta> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta)
        {
            return await this.spTipoContactoEncuesta.ObtenerTipoContactoEncuestaPorID(idTipoContactoEncuesta);
        }

        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuesta()
        {
            return await this.spTipoContactoEncuesta.ObtenerTipoContactoEncuesta();
        }

        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuestaActivos()
        {
            return await this.spTipoContactoEncuesta.ObtenerTipoContactoEncuestaActivos();
        }
    }
}
