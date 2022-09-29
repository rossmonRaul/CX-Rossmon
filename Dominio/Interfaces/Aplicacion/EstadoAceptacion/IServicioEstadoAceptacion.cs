using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.EstadoAceptacion
{
    public interface IServicioEstadoAceptacion
    {
        Task<List<DtoEstadoAceptacion>> ObtenerEstadoAceptacion();
        Task<DtoRespuestaSP> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion);
        Task<DtoRespuestaSP> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion);
        Task<DtoRespuestaSP> EliminarEstadoAceptacion(int idEstadoAceptacion);
        Task<DtoEstadoAceptacion> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion);
    }
}
