using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EstadoAceptacion;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioEstadoAceptacion : IServicioEstadoAceptacion
    {
        private readonly IRepositorioEstadoAceptacion repositorioEstadoAceptacion;

        public ServicioEstadoAceptacion(IRepositorioEstadoAceptacion repositorioEstadoAceptacion)
        {
            this.repositorioEstadoAceptacion = repositorioEstadoAceptacion;
        }

        public async Task<List<DtoEstadoAceptacion>> ObtenerEstadoAceptacion()
        {
            return await this.repositorioEstadoAceptacion.ObtenerEstadoAceptacion();
        }

        public async Task<DtoRespuestaSP> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            return await this.repositorioEstadoAceptacion.InsertarEstadoAceptacion(entitiEstadoAceptacion);
        }
        public async Task<DtoRespuestaSP> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            return await this.repositorioEstadoAceptacion.ActualizarEstadoAceptacion(entitiEstadoAceptacion);
        }
        public async Task<DtoRespuestaSP> EliminarEstadoAceptacion(int idEstadoAceptacion)
        {
            return await this.repositorioEstadoAceptacion.EliminarEstadoAceptacion(idEstadoAceptacion);
        }
        public async Task<DtoEstadoAceptacion> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion)
        {
            return await this.repositorioEstadoAceptacion.ObtenerEstadoAceptacionPorID(idEstadoAceptacion);
        }
    }
}

