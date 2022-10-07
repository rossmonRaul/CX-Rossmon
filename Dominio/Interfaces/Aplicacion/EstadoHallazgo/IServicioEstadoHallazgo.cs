using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.EstadoHallazgo
{
    public interface IServicioEstadoHallazgo
    {
        Task<List<DtoEstadoHallazgo>> ObtenerEstadoHallazgo();
        Task<DtoRespuestaSP> InsertarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo);
        Task<DtoRespuestaSP> ActualizarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo);
        Task<DtoRespuestaSP> EliminarEstadoHallazgo(int idEstadoHallazgo);
        Task<DtoEstadoHallazgo> ObtenerEstadoHallazgoPorID(int idEstadoHallazgo);
    }
}
