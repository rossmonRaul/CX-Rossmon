using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Periodicidad;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioPeriodicidad: IServicioPeriodicidad
    {
        public readonly IRepositorioPeriodicidad repositorioPeriodicidad;
        public ServicioPeriodicidad(IRepositorioPeriodicidad repositorioPeriodicidad)
        {
            this.repositorioPeriodicidad = repositorioPeriodicidad;
        }
        public async Task<DtoRespuestaSP> InsertarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {
            return await this.repositorioPeriodicidad.InsertarPeriodicidad(entitiPeriodicidad);
        }
        public async Task<DtoRespuestaSP> ActualizarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {
            return await this.repositorioPeriodicidad.ActualizarPeriodicidad(entitiPeriodicidad);
        }
        public async Task<DtoRespuestaSP> EliminarPeriodicidad(int idPeriodicidad)
        {
            return await this.repositorioPeriodicidad.EliminarPeriodicidad(idPeriodicidad);
        }
        public async Task<DtoPeriodicidad> ObtenerPeriodicidadPorID(int idPeriodicidad)
        {
            return await this.repositorioPeriodicidad.ObtenerPeriodicidadPorID(idPeriodicidad);
        }

        public async Task<List<DtoPeriodicidad>> ObtenerPeriodicidad()
        {
            return await this.repositorioPeriodicidad.ObtenerPeriodicidad();
        }
    }
}
