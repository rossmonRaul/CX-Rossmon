using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoEncuesta;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoEncuesta : IServicioTipoEncuesta
    {
        public readonly IRepositorioTipoEncuesta spTipoEncuesta;

        public ServicioTipoEncuesta(IRepositorioTipoEncuesta spTipoEncuesta)
        {
            this.spTipoEncuesta = spTipoEncuesta;
        }
        public async Task<DtoRespuestaSP> InsertarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {
            return await this.spTipoEncuesta.InsertarTipoEncuesta(entitiTipoEncuesta);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {
            return await this.spTipoEncuesta.ActualizarTipoEncuesta(entitiTipoEncuesta);
        }
        public async Task<DtoRespuestaSP> EliminarTipoEncuesta(int idTipoEncuesta)
        {
            return await this.spTipoEncuesta.EliminarTipoEncuesta(idTipoEncuesta);
        }
        public async Task<DtoTipoEncuesta> ObtenerTipoEncuestaPorID(int idTipoEncuesta)
        {
            return await this.spTipoEncuesta.ObtenerTipoEncuestaPorID(idTipoEncuesta);
        }

        public async Task<List<DtoTipoEncuesta>> ObtenerTipoEncuesta()
        {
            return await this.spTipoEncuesta.ObtenerTipoEncuesta();
        }

        public async Task<List<DtoTipoEncuesta>> ObtenerTipoEncuestaActivos()
        {
            return await this.spTipoEncuesta.ObtenerTipoEncuestaActivos();
        }
    }
}
