using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioEncuestas
    {
        Task<List<DtoEncuesta>> ObtenerEncuestas();
        Task<DtoRespuestaSP> InsertarEncuestas(EntitiEncuesta entitiEncuesta);
        Task<DtoEncuesta> ObtenerEncuestaPorId(int idEncuesta);
        Task<DtoRespuestaSP> EliminarEncuesta(int idEncuesta);
        Task<DtoRespuestaSP> ActualizarEncuesta(EntitiEncuesta entitiEncuesta);
        Task<List<DtoEncuesta>> ObtenerEncuestasActivas();
    }
}
