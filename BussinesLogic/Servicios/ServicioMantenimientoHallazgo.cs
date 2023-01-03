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

        public async Task<DtoRespuestaSP> AgregarMantenimientoHallazgo(EntitiHallazgo EntitiHallazgo)
        {
            return await this.repositorioMantenimientoHallazgo.AgregarMantenimientoHallazgo(EntitiHallazgo);
        }
        public async Task<DtoRespuestaSP> ActualizarMantenimientoHallazgo(EntitiHallazgo EntitiHallazgo)
        {
            return await this.repositorioMantenimientoHallazgo.ActualizarMantenimientoHallazgo(EntitiHallazgo);
        }
        public async Task<DtoRespuestaSP> EliminarMantenimientoHallazgo(int idMantenimientoHallazgo)
        {
            return await this.repositorioMantenimientoHallazgo.EliminarMantenimientoHallazgo(idMantenimientoHallazgo);
        }
        public async Task<DtoHallazgo> ObtenerMantenimientoHallazgoPorID(int idMantenimientoHallazgo)
        {
            return await this.repositorioMantenimientoHallazgo.ObtenerMantenimientoHallazgoPorID(idMantenimientoHallazgo);
        }

        public async Task<List<DtoHallazgo>> ObtenerMantenimientoHallazgo()
        {
            return await this.repositorioMantenimientoHallazgo.ObtenerMantenimientoHallazgo();
        }

        public async Task<List<DtoGridHallazgo>> ObtenerGridMantenimientoHallazgo()
        {
            return await this.repositorioMantenimientoHallazgo.ObtenerGridMantenimientoHallazgo();
        }
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