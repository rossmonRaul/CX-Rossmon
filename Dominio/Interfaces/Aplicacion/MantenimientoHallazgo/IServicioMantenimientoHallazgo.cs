using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.MantenimientoHallazgo
{
    public interface IServicioMantenimientoHallazgo
    {
        Task<List<DtoHallazgo>> ObtenerMantenimientoHallazgo();
        Task<List<DtoGridHallazgo>> ObtenerGridMantenimientoHallazgo();

        //Task<List<DtoMantenimientoHallazgo>> ObtenerMantenimientoHallazgoActivos();


        Task<DtoRespuestaSP> AgregarMantenimientoHallazgo(EntitiHallazgo entitiMantenimientoHallazgo);


        Task<DtoRespuestaSP> ActualizarMantenimientoHallazgo(EntitiHallazgo entitiMantenimientoHallazgo);


        Task<DtoHallazgo> ObtenerMantenimientoHallazgoPorID(int entitiMantenimientoHallazgo);

        Task<DtoRespuestaSP> EliminarMantenimientoHallazgo(int entitiMantenimientoHallazgo);
        Task<DtoCantidadDatos> ObtenerCantidadMantenimientoHallazgo();
        
        Task<List<DtoOrbe>> ObtenerDatosOrbe();

    }
}
