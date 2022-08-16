using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioMacroActividad
    {
        public SPMacroActividad spMacroActividad = new SPMacroActividad();

        public async Task<DtoRespuestaSP> InsertarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {
            return await this.spMacroActividad.InsertarMacroActividad(entitiMacroActividad);
        }
        public async Task<DtoRespuestaSP> ActualizarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {
            return await this.spMacroActividad.ActualizarMacroActividad(entitiMacroActividad);
        }
        public async Task<DtoRespuestaSP> EliminarMacroActividad(int idMacro)
        {
            return await this.spMacroActividad.EliminarMacroActividad(idMacro);
        }
        public async Task<DtoMacroActividad> ObtenerMacroActividadPorID(int idMacro)
        {
            return await this.spMacroActividad.ObtenerMacroActividadPorID(idMacro);
        }

        public async Task<List<DtoMacroActividad>> ObtenerMacroActividad()
        {
            return await this.spMacroActividad.ObtenerMacroActividad();
        }
    }
}
