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
        public readonly IRepositorioPeriodicidad spPeriodicidad;
        public ServicioPeriodicidad(IRepositorioPeriodicidad spPeriodicidad)
        {
            this.spPeriodicidad = spPeriodicidad;
        }
        public async Task<DtoRespuestaSP> InsertarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {
            return await this.spPeriodicidad.InsertarPeriodicidad(entitiPeriodicidad);
        }
        public async Task<DtoRespuestaSP> ActualizarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {
            return await this.spPeriodicidad.ActualizarPeriodicidad(entitiPeriodicidad);
        }
        public async Task<DtoRespuestaSP> EliminarPeriodicidad(int idPeriodicidad)
        {
            return await this.spPeriodicidad.EliminarPeriodicidad(idPeriodicidad);
        }
        public async Task<DtoPeriodicidad> ObtenerPeriodicidadPorID(int idPeriodicidad)
        {
            return await this.spPeriodicidad.ObtenerPeriodicidadPorID(idPeriodicidad);
        }

        public async Task<List<DtoPeriodicidad>> ObtenerPeriodicidad()
        {
            return await this.spPeriodicidad.ObtenerPeriodicidad();
        }
    }
}
