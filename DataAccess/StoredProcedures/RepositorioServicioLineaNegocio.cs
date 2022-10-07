using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioServicioLineaNegocio : IRepositorioServicioLineaNegocio
    {
        private readonly IContextoBD contextoBD;

        public RepositorioServicioLineaNegocio(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Servicio", entitiServicioLineaNegocio.Servicio);
                data.Add("IdLinea", entitiServicioLineaNegocio.IdLinea);

                string query = "SPInsertarServicioLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdServicio", entitiServicioLineaNegocio.IdServicio);
                data.Add("Servicio", entitiServicioLineaNegocio.Servicio);
                data.Add("IdLinea", entitiServicioLineaNegocio.IdLinea);
                string query = "SPActualizarServicioLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarServicioLineaNegocio(int idServicio)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdServicio", idServicio);
                string query = "SPEliminarServicioLineaNegocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoServicioLineaNegocio> ObtenerServicioLineaNegocioPorID(int idServicio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdServicio", idServicio);
                string query = "SPObtenerServicioLineaNegocioPorID";

                return await this.contextoBD.ObtenerDato<DtoServicioLineaNegocio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoServicioLineaNegocio>> ObtenerServicioLineaNegocio()
        {
            try
            {
                string query = "SPObtenerServicioLineaNegocio";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoServicioLineaNegocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoLineaNegocio>> ObtenerLineasNegocioActivos()
        {
            try
            {
                string query = "SPObtenerLineasNegocioActivos";
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
