using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoInteraccion;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoInteraccion : IServicioTipoInteraccion
    {
        public readonly IRepositorioTipoInteraccion repositorioTipoInteraccion;

        public ServicioTipoInteraccion(IRepositorioTipoInteraccion repositorioTipoInteraccion)
        {
            this.repositorioTipoInteraccion = repositorioTipoInteraccion;
        }
        public async Task<DtoRespuestaSP> InsertarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            return await this.repositorioTipoInteraccion.InsertarTipoInteraccion(entitiTipoInteraccion);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            return await this.repositorioTipoInteraccion.ActualizarTipoInteraccion(entitiTipoInteraccion);
        }
        public async Task<DtoRespuestaSP> EliminarTipoInteraccion(int idTipoInteraccion)
        {
            return await this.repositorioTipoInteraccion.EliminarTipoInteraccion(idTipoInteraccion);
        }
        public async Task<DtoTipoInteraccion> ObtenerTipoInteraccionPorID(int idTipoInteraccion)
        {
            return await this.repositorioTipoInteraccion.ObtenerTipoInteraccionPorID(idTipoInteraccion);
        }

        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccion()
        {
            return await this.repositorioTipoInteraccion.ObtenerTipoInteraccion();
        }

        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccionActivos()
        {
            return await this.repositorioTipoInteraccion.ObtenerTipoInteraccionActivos();
        }
    }
}
