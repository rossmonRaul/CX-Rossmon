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
    public class RepositorioEstadoAceptacion : IRepositorioEstadoAceptacion
    {
        private readonly IContextoBD contextoBD;

        public RepositorioEstadoAceptacion(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Codigo", entitiEstadoAceptacion.codigo);
                data.Add("EstadoAceptacion", entitiEstadoAceptacion.estadoAceptacion);

                string query = "SPInsertarEstadoAceptacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdEstadoAceptacion", entitiEstadoAceptacion.idEstadoAceptacion);
                data.Add("EstadoAceptacion", entitiEstadoAceptacion.estadoAceptacion);
                string query = "SPActualizarEstadoAceptacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarEstadoAceptacion(int idEstadoAceptacion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEstadoAceptacion", idEstadoAceptacion);
                string query = "SPEliminarEstadoAceptacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoEstadoAceptacion> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEstadoAceptacion", idEstadoAceptacion);
                string query = "SPObtenerEstadoAceptacionPorID";

                return await this.contextoBD.ObtenerDato<DtoEstadoAceptacion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoEstadoAceptacion>> ObtenerEstadoAceptacion()
        {
            try
            {
                string query = "SPObtenerEstadoAceptacion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEstadoAceptacion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}