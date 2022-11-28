using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioResponsables
    {
        Task<List<DtoResponsable>> ObtenerResponsables();
        Task<DtoRespuestaSP> InsertarResponsables(EntitiResponsable entitiResponsable);
        Task<DtoResponsable> ObtenerResponsablePorId(int idResponsable);
        Task<List<DtoResponsable>> ObtenerResponsablesPorIdHallazgo(int idHallazgo);
        Task<DtoRespuestaSP> EliminarResponsable(int idResponsable);
        Task<DtoRespuestaSP> ActualizarResponsable(EntitiResponsable entitiResponsable);
        Task<List<DtoResponsable>> ObtenerResponsablesActivos();

    }
}
