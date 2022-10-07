using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.MacroActividad;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioMacroActividad : IServicioMacroActividad
    {
        private readonly IRepositorioMacroActividad repositorioMacroActividad;

        public ServicioMacroActividad(IRepositorioMacroActividad repositorioMacroActividad)
        {
            this.repositorioMacroActividad = repositorioMacroActividad;
        }
        public async Task<DtoRespuestaSP> InsertarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {
            return await this.repositorioMacroActividad.InsertarMacroActividad(entitiMacroActividad);
        }
        public async Task<DtoRespuestaSP> ActualizarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {
            return await this.repositorioMacroActividad.ActualizarMacroActividad(entitiMacroActividad);
        }
        public async Task<DtoRespuestaSP> EliminarMacroActividad(int idMacro)
        {
            return await this.repositorioMacroActividad.EliminarMacroActividad(idMacro);
        }
        public async Task<DtoMacroActividad> ObtenerMacroActividadPorID(int idMacro)
        {
            return await this.repositorioMacroActividad.ObtenerMacroActividadPorID(idMacro);
        }

        public async Task<List<DtoMacroActividad>> ObtenerMacroActividad()
        {
            return await this.repositorioMacroActividad.ObtenerMacroActividad();
        }
    }
}
