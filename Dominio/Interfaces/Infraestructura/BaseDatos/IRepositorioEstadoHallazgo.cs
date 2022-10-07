using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioEstadoHallazgo
    {
        Task<List<DtoEstadoHallazgo>> ObtenerEstadoHallazgo();
        Task<DtoRespuestaSP> InsertarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo);
        Task<DtoRespuestaSP> ActualizarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo);
        Task<DtoRespuestaSP> EliminarEstadoHallazgo(int idEstadoHallazgo);
        Task<DtoEstadoHallazgo> ObtenerEstadoHallazgoPorID(int idEstadoHallazgo);

    }
}
