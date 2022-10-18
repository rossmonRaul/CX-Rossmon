using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.MantenimientoHallazgo;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioMantenimientoHallazgo : IServicioMantenimientoHallazgo
    {

        private readonly IRepositorioMantenimientoHallazgo repositorioMantenimientoHallazgo;
        public ServicioMantenimientoHallazgo(IRepositorioMantenimientoHallazgo repositorioMantenimientoHallazgo)
        {
            this.repositorioMantenimientoHallazgo = repositorioMantenimientoHallazgo;
        }
        /*int idMantenimientoHallazgo*/
        public async Task<DtoCantidadDatos> ObtenerCantidadMantenimientoHallazgo()
        {
            return await this.repositorioMantenimientoHallazgo.ObtenerCantidadMantenimientoHallazgo();
        }

        public async Task<List<DtoOrbe>> ObtenerDatosOrbe()
        {
            return await this.repositorioMantenimientoHallazgo.ObtenerDatosOrbe();
        }
    }
}
