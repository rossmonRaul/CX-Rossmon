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
        Task<DtoCantidadDatos> ObtenerCantidadMantenimientoHallazgo(/*int idMantenimientoHallazgo*/);
        Task<List<DtoOrbe>> ObtenerDatosOrbe();


    }
}