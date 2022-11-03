using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Responsables
{
    public interface IServicioResponsables
    {
        Task<List<DtoResponsable>> ObtenerResponsables();

        Task<DtoRespuestaSP> InsertarResponsables(EntitiResponsable entitiResponsables);

        Task<DtoRespuestaSP> ActualizarResponsable(EntitiResponsable entitiResponsable);

        Task<DtoResponsable> ObtenerResponsablePorID(int idResponsable);

        Task<DtoRespuestaSP> EliminarResponsable(int idResponsables);

        Task<List<DtoResponsable>> ObtenerResponsablesActivos();
    }
}
