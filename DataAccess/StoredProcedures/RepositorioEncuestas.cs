using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioEncuestas : IRepositorioEncuestas
    {
        private readonly IContextoBD contextoBD;

        public RepositorioEncuestas(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarEncuestas(EntitiEncuesta entitiEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoEncuesta", entitiEncuesta.IdTipoEncuesta);
                data.Add("Nombre", entitiEncuesta.Nombre);
                data.Add("Descripcion", entitiEncuesta.Descripcion);
                data.Add("IdFaseCJ", entitiEncuesta.IdFaseCJ);
                data.Add("IdTipoContactoEncuesta", entitiEncuesta.IdTipoContactoEncuesta);
                string query = "SPInsertarEncuestas";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarEncuesta(EntitiEncuesta entitiEncuesta)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdEncuesta", entitiEncuesta.IdEncuesta);
                data.Add("IdTipoEncuesta", entitiEncuesta.IdTipoEncuesta);
                data.Add("Nombre", entitiEncuesta.Nombre);
                data.Add("Descripcion", entitiEncuesta.Descripcion);
                data.Add("IdFaseCJ", entitiEncuesta.IdFaseCJ);
                data.Add("IdTipoContactoEncuesta", entitiEncuesta.IdTipoContactoEncuesta);
                string query = "SPActualizarEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarEncuesta(int idEncuesta)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEncuesta", idEncuesta);
                string query = "SPEliminarEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoEncuesta> ObtenerEncuestaPorId(int idEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEncuesta", idEncuesta);
                string query = "SPObtenerEncuestaPorID";

                return await this.contextoBD.ObtenerDato<DtoEncuesta>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoEncuesta>> ObtenerEncuestas()
        {
            try
            {
                string query = "SPObtenerEncuestas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoEncuesta>> ObtenerEncuestasActivas()
        {
            try
            {
                string query = "SPObtenerEncuestasActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEncuesta>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}
