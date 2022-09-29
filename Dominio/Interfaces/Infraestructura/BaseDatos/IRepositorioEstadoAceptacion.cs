using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioEstadoAceptacion
    {
        Task<List<DtoEstadoAceptacion>> ObtenerEstadoAceptacion();
        Task<DtoRespuestaSP> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion);
        Task<DtoRespuestaSP> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion);
        Task<DtoRespuestaSP> EliminarEstadoAceptacion(int idEstadoAceptacion);
        Task<DtoEstadoAceptacion> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion);
    }
}
