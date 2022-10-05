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
        public readonly IRepositorioTipoEncuesta repositorioTipoEncuesta;

        public ServicioTipoEncuesta(IRepositorioTipoEncuesta repositorioTipoEncuesta)
        {
            this.repositorioTipoEncuesta = repositorioTipoEncuesta;
        }
        public async Task<DtoRespuestaSP> InsertarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {
            return await this.repositorioTipoEncuesta.InsertarTipoEncuesta(entitiTipoEncuesta);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {
            return await this.repositorioTipoEncuesta.ActualizarTipoEncuesta(entitiTipoEncuesta);
        }
        public async Task<DtoRespuestaSP> EliminarTipoEncuesta(int idTipoEncuesta)
        {
            return await this.repositorioTipoEncuesta.EliminarTipoEncuesta(idTipoEncuesta);
        }
        public async Task<DtoTipoEncuesta> ObtenerTipoEncuestaPorID(int idTipoEncuesta)
        {
            return await this.repositorioTipoEncuesta.ObtenerTipoEncuestaPorID(idTipoEncuesta);
        }

        public async Task<List<DtoTipoEncuesta>> ObtenerTipoEncuesta()
        {
            return await this.repositorioTipoEncuesta.ObtenerTipoEncuesta();
        }

        public async Task<List<DtoTipoEncuesta>> ObtenerTipoEncuestaActivos()
        {
            return await this.repositorioTipoEncuesta.ObtenerTipoEncuestaActivos();
        }
    }
}
