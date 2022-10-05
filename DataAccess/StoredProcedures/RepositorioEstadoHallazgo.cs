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
    public class RepositorioEstadoHallazgo : IRepositorioEstadoHallazgo
    {
        private readonly IContextoBD contextoBD;

        public RepositorioEstadoHallazgo(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Codigo", entitiEstadoHallazgo.codigo);
                data.Add("EstadoHallazgo", entitiEstadoHallazgo.estadoHallazgo);

                string query = "SPInsertarEstadoHallazgo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdEstadoHallazgo", entitiEstadoHallazgo.idEstadoHallazgo);
                data.Add("EstadoHallazgo", entitiEstadoHallazgo.estadoHallazgo);
                string query = "SPActualizarEstadoHallazgo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarEstadoHallazgo(int idEstadoHallazgo)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEstadoHallazgo", idEstadoHallazgo);
                string query = "SPEliminarEstadoHallazgo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoEstadoHallazgo> ObtenerEstadoHallazgoPorID(int idEstadoHallazgo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEstadoHallazgo", idEstadoHallazgo);
                string query = "SPObtenerEstadoHallazgoPorID";

                return await this.contextoBD.ObtenerDato<DtoEstadoHallazgo>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoEstadoHallazgo>> ObtenerEstadoHallazgo()
        {
            try
            {
                string query = "SPObtenerEstadoHallazgo";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEstadoHallazgo>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}