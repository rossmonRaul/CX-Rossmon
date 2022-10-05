using Dapper;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{

    public class RepositorioMacroActividad : IRepositorioMacroActividad
    {
        private readonly IContextoBD contextoBD;

        public RepositorioMacroActividad(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("MacroActividad", entitiMacroActividad.macroActividad);

                string query = "SPInsertarMacroActividad";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdMacro", entitiMacroActividad.idMacro);
                data.Add("MacroActividad", entitiMacroActividad.macroActividad);
                string query = "SPActualizarMacroActividad";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarMacroActividad(int idMacro)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMacro", idMacro);
                string query = "SPEliminarMacroActividad";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoMacroActividad> ObtenerMacroActividadPorID(int idMacro)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMacro", idMacro);
                string query = "SPObtenerMacroActividadPorID";

                return await this.contextoBD.ObtenerDato<DtoMacroActividad>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoMacroActividad>> ObtenerMacroActividad()
        {
            try
            {
                string query = "SPObtenerMacroActividades";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoMacroActividad>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
