using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioMantenimientoHallazgo
    {

        Task<DtoRespuestaSP> AgregarMantenimientoHallazgo(EntitiHallazgo EntitiHallazgo);
        Task<DtoRespuestaSP> ActualizarMantenimientoHallazgo(EntitiHallazgo EntitiHallazgo);
        Task<DtoRespuestaSP> EliminarMantenimientoHallazgo(int idMantenimientoHallazgo);
        Task<DtoHallazgo> ObtenerMantenimientoHallazgoPorID(int idMantenimientoHallazgo);
        Task<List<DtoHallazgo>> ObtenerMantenimientoHallazgo();
        Task<List<DtoGridHallazgo>> ObtenerGridMantenimientoHallazgo();
        Task<DtoCantidadDatos> ObtenerCantidadMantenimientoHallazgo();
        Task<List<DtoOrbe>> ObtenerDatosOrbe();
    }
}