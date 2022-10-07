using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioTipoContactoEncuesta : IRepositorioTipoContactoEncuesta
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoContactoEncuesta(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoContactoEncuesta", entitiTipoContactoEncuesta.tipoContactoEncuesta);

                string query = "SPInsertarTipoContactoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoContactoEncuesta", entitiTipoContactoEncuesta.idTipoContactoEncuesta);
                data.Add("TipoContactoEncuesta", entitiTipoContactoEncuesta.tipoContactoEncuesta);
                string query = "SPActualizarTipoContactoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoContactoEncuesta", idTipoContactoEncuesta);
                string query = "SPEliminarTipoContactoEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoContactoEncuesta> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoContactoEncuesta", idTipoContactoEncuesta);
                string query = "SPObtenerTipoContactoEncuestaPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoContactoEncuesta>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuesta()
        {
            try
            {
                string query = "SPObtenerTipoContactoEncuesta";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoContactoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuestaActivos()
        {
            try
            {
                string query = "SPObtenerTipoContactoEncuestaActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoContactoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
