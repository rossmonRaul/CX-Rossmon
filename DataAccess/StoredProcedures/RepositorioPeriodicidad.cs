using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioPeriodicidad : IRepositorioPeriodicidad
    {
        private readonly IContextoBD contextoBD;

        public RepositorioPeriodicidad(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Periodicidad", entitiPeriodicidad.periodicidad);

                string query = "SPInsertarPeriodicidad";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdPeriodicidad", entitiPeriodicidad.idPeriodicidad);
                data.Add("Periodicidad", entitiPeriodicidad.periodicidad);
                string query = "SPActualizarPeriodicidad";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarPeriodicidad(int idPeriodicidad)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdPeriodicidad", idPeriodicidad);
                string query = "SPEliminarPeriodicidad";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoPeriodicidad> ObtenerPeriodicidadPorID(int idPeriodicidad)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdPeriodicidad", idPeriodicidad);
                string query = "SPObtenerPeriodicidadPorID";

                return await this.contextoBD.ObtenerDato<DtoPeriodicidad>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoPeriodicidad>> ObtenerPeriodicidad()
        {
            try
            {
                string query = "SPObtenerPeriodicidades";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoPeriodicidad>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
