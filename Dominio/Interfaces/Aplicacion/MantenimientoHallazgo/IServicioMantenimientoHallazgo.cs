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
        Task<DtoCantidadDatos> ObtenerCantidadMantenimientoHallazgo();
        Task<List<DtoOrbe>> ObtenerDatosOrbe();

    }
}
