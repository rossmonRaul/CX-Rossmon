using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioCanales : IRepositorioCanales
    {
        private readonly IContextoBD contextoBD;

        public RepositorioCanales(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarCanales(EntitiCanales entitiCanales)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Canal", entitiCanales.canal);
                string query = "SPInsertarCanales";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarCanales(EntitiCanales entitiCanales)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdCanal", entitiCanales.idCanal);
                data.Add("Canal", entitiCanales.canal);
                string query = "SPActualizarCanales";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarCanales(int idCanal)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdCanal", idCanal);
                string query = "SPEliminarCanales";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoCanales> ObtenerCanalesPorID(int idCanal)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdCanal", idCanal);
                string query = "SPObtenerCanalesPorID";

                return await this.contextoBD.ObtenerDato<DtoCanales>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoCanales>> ObtenerCanales()
        {
            try
            {
                string query = "SPObtenerCanales";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoCanales>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

    

}