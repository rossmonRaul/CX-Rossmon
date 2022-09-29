using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Periodicidad
{
    public interface IServicioPeriodicidad
    {
        Task<DtoRespuestaSP> InsertarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad);
        Task<DtoRespuestaSP> ActualizarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad);
        Task<DtoRespuestaSP> EliminarPeriodicidad(int idPeriodicidad);
        Task<DtoPeriodicidad> ObtenerPeriodicidadPorID(int idPeriodicidad);
        Task<List<DtoPeriodicidad>> ObtenerPeriodicidad();
    }
}
