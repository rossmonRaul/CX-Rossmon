using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioMantenimientoTalleresCoCreacion
    {
        Task<DtoCantidadDatos> ObtenerCantidadMantenimientoTalleresCoCreacion();

        Task<List<DtoOrbe>> ObtenerDatosOrbe();

        Task<List<DtoMantenimientoTallerCoCreacion>> ObtenerEtapasTallerCoCreacion(int idTipoTaller);
        Task<DtoMantenimientoTallerCoCreacion> ObtenerFechasTallerCoCreacion(int idTipoTaller);

        Task<List<DtoMantenimientoTallerCoCreacion>> ObtenerMantenimientoTallerCoCreacion();
        Task<DtoRespuestaSP> AgregarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion);
        Task<DtoRespuestaSP> ActualizarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion);
        Task<DtoMantenimientoTallerCoCreacion> ObtenerMantenimientoTallerCoCreacionPorID(int idMantenimientoTallerCoCreacion);
        Task<DtoRespuestaSP> EliminarMantenimientoTallerCoCreacion(int idMantenimientoTallerCoCreacion);

    }
}
