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
    public class RepositorioTipoEncuesta : IRepositorioTipoEncuesta
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoEncuesta(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoEncuesta", entitiTipoEncuesta.TipoEncuesta);

                string query = "SPInsertarTipoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoEncuesta", entitiTipoEncuesta.IdTipoEncuesta);
                data.Add("TipoEncuesta", entitiTipoEncuesta.TipoEncuesta);
                string query = "SPActualizarTipoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoEncuesta(int idTipoEncuesta)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoEncuesta", idTipoEncuesta);
                string query = "SPEliminarTipoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoEncuesta> ObtenerTipoEncuestaPorID(int idTipoEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoEncuesta", idTipoEncuesta);
                string query = "SPObtenerTipoEncuestaPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoEncuesta>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoEncuesta>> ObtenerTipoEncuesta()
        {
            try
            {
                string query = "SPObtenerTiposEncuestas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoEncuesta>> ObtenerTipoEncuestaActivos()
        {
            try
            {
                string query = "SPObtenerEncuestasActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
