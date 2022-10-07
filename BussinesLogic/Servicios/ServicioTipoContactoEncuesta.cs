using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoContactoEncuesta;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoContactoEncuesta: IServicioTipoContactoEncuesta
    {
        public readonly IRepositorioTipoContactoEncuesta repositorioTipoContactoEncuesta;

        public ServicioTipoContactoEncuesta(IRepositorioTipoContactoEncuesta repositorioTipoContactoEncuesta)
        {
            this.repositorioTipoContactoEncuesta = repositorioTipoContactoEncuesta;
        }
        public async Task<DtoRespuestaSP> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            return await this.repositorioTipoContactoEncuesta.InsertarTipoContactoEncuesta(entitiTipoContactoEncuesta);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            return await this.repositorioTipoContactoEncuesta.ActualizarTipoContactoEncuesta(entitiTipoContactoEncuesta);
        }
        public async Task<DtoRespuestaSP> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta)
        {
            return await this.repositorioTipoContactoEncuesta.EliminarTipoContactoEncuesta(idTipoContactoEncuesta);
        }
        public async Task<DtoTipoContactoEncuesta> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta)
        {
            return await this.repositorioTipoContactoEncuesta.ObtenerTipoContactoEncuestaPorID(idTipoContactoEncuesta);
        }

        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuesta()
        {
            return await this.repositorioTipoContactoEncuesta.ObtenerTipoContactoEncuesta();
        }

        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuestaActivos()
        {
            return await this.repositorioTipoContactoEncuesta.ObtenerTipoContactoEncuestaActivos();
        }
    }
}
