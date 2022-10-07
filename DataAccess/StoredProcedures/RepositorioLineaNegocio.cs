using Dapper;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.StoredProcedures
{
    public class RepositorioLineaNegocio : IRepositorioLineaNegocio
    {
        private readonly IContextoBD contextoBD;

        public RepositorioLineaNegocio(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("LineaNegocio", entitiLineaNegocio.lineaNegocio);

                string query = "SPInsertarLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdLinea", entitiLineaNegocio.idLinea);
                data.Add("LineaNegocio", entitiLineaNegocio.lineaNegocio);
                string query = "SPActualizarLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarLineaNegocio(int idLinea)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdLinea", idLinea);
                string query = "SPEliminarLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoLineaNegocio> ObtenerLineaNegocioPorID(int idLinea)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdLinea", idLinea);
                string query = "SPObtenerLineaNegocioPorID";

                return await this.contextoBD.ObtenerDato<DtoLineaNegocio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocio()
        {
            try
            {
                string query = "SPObtenerLineaNegocio";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoLineaNegocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
