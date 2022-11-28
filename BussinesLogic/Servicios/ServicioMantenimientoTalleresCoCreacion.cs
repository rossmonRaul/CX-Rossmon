using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.MantenimientoTalleresCoCreacion;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioMantenimientoTalleresCoCreacion : IServicioMantenimientoTalleresCoCreacion
    {

        private readonly IRepositorioMantenimientoTalleresCoCreacion repositorioMantenimientoTalleresCoCreacion;
        public ServicioMantenimientoTalleresCoCreacion(IRepositorioMantenimientoTalleresCoCreacion repositorioMantenimientoTalleresCoCreacion)
        {
            this.repositorioMantenimientoTalleresCoCreacion = repositorioMantenimientoTalleresCoCreacion;
        }
        /*int idMantenimientoHallazgo*/
        public async Task<DtoRespuestaSP> AgregarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion)
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.AgregarMantenimientoTallerCoCreacion(entitiMantenimientoTallerCoCreacion);
        }
        public async Task<DtoRespuestaSP> ActualizarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion)
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.ActualizarMantenimientoTallerCoCreacion(entitiMantenimientoTallerCoCreacion);
        }
        public async Task<DtoRespuestaSP> EliminarMantenimientoTallerCoCreacion(int idMantenimientoTallerCoCreacion)
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.EliminarMantenimientoTallerCoCreacion(idMantenimientoTallerCoCreacion);
        }
        public async Task<DtoMantenimientoTallerCoCreacion> ObtenerMantenimientoTallerCoCreacionPorID(int idMantenimientoTallerCoCreacion)
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.ObtenerMantenimientoTallerCoCreacionPorID(idMantenimientoTallerCoCreacion);
        }

        public async Task<List<DtoMantenimientoTallerCoCreacion>> ObtenerMantenimientoTallerCoCreacion()
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.ObtenerMantenimientoTallerCoCreacion();
        }

        public async Task<List<DtoMantenimientoTallerCoCreacion>> ObtenerEtapasTallerCoCreacion(int idTipoTaller)
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.ObtenerEtapasTallerCoCreacion(idTipoTaller);
        }
        public async Task<DtoMantenimientoTallerCoCreacion> ObtenerFechasTallerCoCreacion(int idTipoTaller)
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.ObtenerFechasTallerCoCreacion(idTipoTaller);
        }

        public async Task<DtoCantidadDatos> ObtenerCantidadMantenimientoTalleresCoCreacion()
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.ObtenerCantidadMantenimientoTalleresCoCreacion();
        }

        public async Task<List<DtoOrbe>> ObtenerDatosOrbe()
        {
            return await this.repositorioMantenimientoTalleresCoCreacion.ObtenerDatosOrbe();
        }
    }
}