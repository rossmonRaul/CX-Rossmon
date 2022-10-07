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
    public class RepositorioServicioSocio : IRepositorioServicioSocio
    {
        private readonly IContextoBD contextoBD;

        public RepositorioServicioSocio(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSocio", entitiServicioSocio.Nombre);
                data.Add("IdLinea", entitiServicioSocio.LineaNegocio);
                data.Add("IdServicio", entitiServicioSocio.Servicio);

                string query = "SPInsertarServicioSocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdServicioSocio", entitiServicioSocio.idServicioSocio);
                data.Add("IdSocio", entitiServicioSocio.Nombre);
                data.Add("IdLinea", entitiServicioSocio.LineaNegocio);
                data.Add("IdServicio", entitiServicioSocio.Servicio);
                string query = "SPActualizarServicioSocio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarServicioSocio(int idServicioSocio)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdServicioSocio", idServicioSocio);
                string query = "SPEliminarServicioSocios";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoServicioSocio> ObtenerServicioSocioPorID(int idServicioSocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdServicioSocio", idServicioSocio);
                string query = "SPObtenerServicioSocioPorID";

                return await this.contextoBD.ObtenerDato<DtoServicioSocio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoServicioSocio>> ObtenerServicioSocio()
        {
            try
            {
                string query = "SPObtenerServiciosSocios";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoServicioSocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoServicioSocio>> ObtenerServicioSocioActivos()
        {
            try
            {
                string query = "SPObtenerServicioSocioActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoServicioSocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
