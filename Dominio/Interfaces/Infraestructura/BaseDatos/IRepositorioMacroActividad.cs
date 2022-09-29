using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioMacroActividad
    {
        Task<DtoRespuestaSP> InsertarMacroActividad(EntitiMacroActividad entitiMacroActividad);
        Task<DtoRespuestaSP> ActualizarMacroActividad(EntitiMacroActividad entitiMacroActividad);
        Task<DtoRespuestaSP> EliminarMacroActividad(int idMacro);
        Task<DtoMacroActividad> ObtenerMacroActividadPorID(int idMacro);
        Task<List<DtoMacroActividad>> ObtenerMacroActividad();
    }
}
