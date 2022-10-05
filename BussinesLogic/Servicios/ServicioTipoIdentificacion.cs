using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoIdentificacion;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoIdentificacion : IServicioTipoIdentificacion 
    { 
        private readonly IRepositorioTipoIdentificacion repositorioTipoIdentificacion;

        public ServicioTipoIdentificacion(IRepositorioTipoIdentificacion repositorioTipoIdentificacion)
        {
            this.repositorioTipoIdentificacion = repositorioTipoIdentificacion;
        }
        public async Task<DtoRespuestaSP> InsertarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion)
        {
            return await this.repositorioTipoIdentificacion.InsertarTipoIdentificacion(entitiTipoIdentificacion);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion)
        {
            return await this.repositorioTipoIdentificacion.ActualizarTipoIdentificacion(entitiTipoIdentificacion);
        }
        public async Task<DtoRespuestaSP> EliminarTipoIdentificacion(int idTipoIdentificacion)
        {
            return await this.repositorioTipoIdentificacion.EliminarTipoIdentificacion(idTipoIdentificacion);
        }
        public async Task<DtoTipoIdentificacion> ObtenerTipoIdentificacionPorID(int idTipoIdentificacion)
        {
            return await this.repositorioTipoIdentificacion.ObtenerTipoIdentificacionPorID(idTipoIdentificacion);
        }

        public async Task<List<DtoTipoIdentificacion>> ObtenerTipoIdentificacion()
        {
            return await this.repositorioTipoIdentificacion.ObtenerTipoIdentificacion();
        }

        public async Task<List<DtoTipoIdentificacion>> ObtenerTipoIdentificacionActivos()
        {
            return await this.repositorioTipoIdentificacion.ObtenerTipoIdentificacionActivos();
        }
    }
}